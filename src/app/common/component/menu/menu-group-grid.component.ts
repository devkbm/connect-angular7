import { Component, OnInit, Output, EventEmitter } from '@angular/core';


import { AggridFunction } from '../../grid/aggrid-function';
import { MenuGroup } from '../../model/menu-group';
import { MenuService } from '../../service/menu.service';
import { AppAlarmService } from '../../service/app-alarm.service';
import { ResponseList } from '../../model/response-list';

@Component({
  selector: 'app-menu-group-grid',
  templateUrl: './menu-group-grid.component.html',
  styleUrls: ['./menu-group-grid.component.css']
})
export class MenuGroupGridComponent extends AggridFunction implements OnInit {

  protected menuGroupList: MenuGroup[];

  @Output()
  rowSelected = new EventEmitter();

  @Output()
  editButtonClicked = new EventEmitter();

  @Output()
  rowDoubleClicked = new EventEmitter();

  constructor(private menuService: MenuService,
              private appAlarmService: AppAlarmService) {

    super();

    this.columnDefs = [
      {
        headerName: '',
        width: 34,
        cellStyle: {'text-align': 'center', 'padding': '0px'},
        cellRenderer: 'buttonRenderer',
        cellRendererParams: {
          onClick: this.onEditButtonClick.bind(this),
          label: '',
          iconType: 'form'
        }
      },
      {
        headerName: 'No',
        valueGetter: 'node.rowIndex + 1',
        width: 70,
        cellStyle: {'text-align': 'center'}
      },
      {
        headerName: '메뉴그룹코드',
        field: 'menuGroupCode',
        width: 120,
        cellStyle: {'text-align': 'center'}
      },
      {
        headerName: '메뉴그룹명',
        field: 'menuGroupName',
        width: 150
      },
      {
        headerName: '설명',
        field: 'description',
        width: 300,
        headerClass: 'text-center'
      }
    ];

    this.getRowNodeId = function(data) {
        return data.menuGroupCode;
    };
  }

  private onEditButtonClick(e) {
    this.editButtonClicked.emit(e.rowData);
  }

  ngOnInit() {
    this.getMenuGroupList();
  }

  public getMenuGroupList(params?: any): void {
    this.menuService
        .getMenuGroupList(params)
        .subscribe(
          (model: ResponseList<MenuGroup>) => {
              if (model.total > 0) {
                  this.menuGroupList = model.data;
              } else {
                  this.menuGroupList = null;
              }
              this.appAlarmService.changeMessage(model.message);
          },
          (err) => {
              console.log(err);
          },
          () => {}
        );
  }

  private selectionChanged(event) {
    const selectedRows = this.gridApi.getSelectedRows();

    this.rowSelected.emit(selectedRows[0]);
  }

  private rowDbClicked(event) {
    this.rowDoubleClicked.emit(event.data);
  }

}
