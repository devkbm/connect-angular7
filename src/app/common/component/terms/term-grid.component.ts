import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { TermService } from '../../service/term.service';
import { AppAlarmService } from '../../service/app-alarm.service';

import { ResponseList } from '../../model/response-list';
import { Term } from '../../model/term';
import { AggridFunction } from '../../grid/aggrid-function';

@Component({
  selector: 'app-term-grid',
  templateUrl: './term-grid.component.html',
  styleUrls: ['./term-grid.component.css']
})
export class TermGridComponent extends AggridFunction implements OnInit {

  protected termList: Term[];

  @Output()
  rowSelected = new EventEmitter();

  @Output()
  rowDoubleClicked = new EventEmitter();

  @Output()
  editButtonClicked = new EventEmitter();

  constructor(private termService: TermService,
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
      {headerName: '업무영역',    field: 'domain',            width: 100 },
      {headerName: '용어',        field: 'term',              width: 150 },
      {headerName: '한글명',      field: 'nameKor',           width: 150 },
      {headerName: '약어',        field: 'abbreviationKor',   width: 100 },
      {headerName: '영어명',      field: 'nameEng',           width: 150 },
      {headerName: '약어',        field: 'abbreviationEng',   width: 100 },
      {headerName: '설명',        field: 'description',       width: 150 },
      {headerName: '비고',        field: 'comment',           width: 150 }
    ];

    this.getRowNodeId = function(data) {
        return data.pkTerm;
    };
  }

  ngOnInit() {
    this.getTermList();
  }

  private onEditButtonClick(e) {
    this.editButtonClicked.emit(e.rowData);
  }

  public getTermList(params?: any): void {
    this.termService
        .getTermList(params)
        .subscribe(
          (model: ResponseList<Term>) => {
              if (model.total > 0) {
                  this.termList = model.data;
              } else {
                  this.termList = null;
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
