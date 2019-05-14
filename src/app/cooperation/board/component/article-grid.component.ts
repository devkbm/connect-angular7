import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AggridFunction } from 'src/app/common/grid/aggrid-function';
import { AppAlarmService } from 'src/app/common/service/app-alarm.service';
import { Article } from '../model/article';
import { BoardService } from '../service/board.service';
import { ResponseList } from 'src/app/common/model/response-list';

@Component({
  selector: 'app-article-grid',
  templateUrl: './article-grid.component.html',
  styleUrls: ['./article-grid.component.css']
})
export class ArticleGridComponent extends AggridFunction implements OnInit {

  articleList: Article[];

  @Output()
  rowSelected = new EventEmitter();

  @Output()
  rowDoubleClicked = new EventEmitter();

  @Output()
  editButtonClicked = new EventEmitter();

  constructor(private appAlarmService: AppAlarmService,
              private boardService: BoardService) {
    super();

    this.columnDefs = [
      {
          headerName: 'No',
          valueGetter: 'node.rowIndex + 1',
          width: 70,
          cellStyle: {'text-align': 'center'},
          suppressSizeToFit: true
      },
      {
          headerName: '제목',
          field: 'title'
      },
      {
        headerName: '등록일자',
        cellRenderer: (data) => {
          return new Date(data.value).toLocaleString();
        },
        field: 'createdDt',
        width: 180,
        cellStyle: {'text-align': 'center'},
        suppressSizeToFit: true
      },
      {
        headerName: '수정일자',
        cellRenderer: (data) => {
          return new Date(data.value).toLocaleString();
        },
        field: 'modifiedDt',
        width: 180,
        cellStyle: {'text-align': 'center'},
        suppressSizeToFit: true
      }
    ];

    this.defaultColDef = {
      sortable: true,
      resizable: true,
    };


    this.getRowNodeId = function(data) {
        return data.pkArticle;
    };
  }

  ngOnInit() {
    //this.setWidthAndHeight('100%', '100%');    
  }

  getArticleList(fkBoard): void {
    this.boardService
        .getArticleList(fkBoard)
        .subscribe(
          (model: ResponseList<Article>) => {
              if (model.total > 0) {
                  this.articleList = model.data;
                  // this.sizeToFit();                  
              } else {
                  this.articleList = null;
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

  onGridSizeChanged(params) {
    /*
    var gridWidth = document.getElementById("grid-wrapper").offsetWidth;
    var columnsToShow = [];
    var columnsToHide = [];
    var totalColsWidth = 0;
    var allColumns = this.gridColumnApi.getAllColumns();

    for (var i = 0; i < allColumns.length; i++) {
      let column = allColumns[i];
      totalColsWidth += column.getMinWidth();
      if (totalColsWidth > gridWidth) {
        columnsToHide.push(column.colId);
      } else {
        columnsToShow.push(column.colId);
      }
    }
    */
        /*
    params.columnApi.setColumnsVisible(columnsToShow, true);
    params.columnApi.setColumnsVisible(columnsToHide, false);
    params.api.sizeColumnsToFit();
    */    

    //this.gridColumnApi.setColumnsVisible(columnsToShow, true);
    //this.gridColumnApi.setColumnsVisible(columnsToHide, false);
    this.gridApi.sizeColumnsToFit();
  }

  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }

}
