import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { ProgramService } from '../../service/program.service';
import { AppAlarmService } from '../../service/app-alarm.service';

import { ResponseList } from '../../model/response-list';
import { Program } from '../../model/Program';
import { AggridFunction } from '../../grid/aggrid-function';

@Component({
  selector: 'app-program-grid',
  templateUrl: './program-grid.component.html',
  styleUrls: ['./program-grid.component.css']
})
export class ProgramGridComponent extends AggridFunction implements OnInit {

  protected programList: Program[];

  @Output()
  rowSelected = new EventEmitter();

  @Output()
  rowDoubleClicked = new EventEmitter();

  @Output()
  editButtonClicked = new EventEmitter();

  constructor(private programService: ProgramService,
              private appAlarmService: AppAlarmService) {

    super([]);

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
      {headerName: '<span style="background-color: blue">프로그램코드</span>',   field: 'programCode',     width: 150 },
      {headerName: '프로그램명',     field: 'programName',     width: 200 },
      {headerName: 'Url',           field: 'url',             width: 200 },
      {headerName: '설명',          field: 'description',     width: 300 }
    ];

    this.getRowNodeId = function(data) {
        return data.programCode;
    };
  }

  ngOnInit() {
    this.getProgramList();
  }

  private onEditButtonClick(e) {
    this.editButtonClicked.emit(e.rowData);
  }

  public getProgramList(params?: any): void {
    this.programService
        .getProgramList(params)
        .subscribe(
          (model: ResponseList<Program>) => {
              if (model.total > 0) {
                  this.programList = model.data;
              } else {
                  this.programList = null;
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
