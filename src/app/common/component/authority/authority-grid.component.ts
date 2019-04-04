import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { UserService } from '../../service/user.service';
import { AppAlarmService } from '../../service/app-alarm.service';

import { Authority } from '../../model/authority';
import { ResponseList } from '../../model/response-list';
import { AggridFunction } from '../../grid/aggrid-function';

@Component({
  selector: 'app-authority-grid',
  templateUrl: './authority-grid.component.html',
  styleUrls: ['./authority-grid.component.css']
})
export class AuthorityGridComponent extends AggridFunction implements OnInit {

    protected authorityList: Authority[];

    @Output()
    rowSelected = new EventEmitter();

    @Output()
    rowDoubleClicked = new EventEmitter();

    @Output()
    editButtonClicked = new EventEmitter();

    constructor(private userService: UserService,
                private appAlarmService: AppAlarmService) {

        super();

        this.columnDefs = [
            {
                headerName: '',
                sortable: true,
                resizable: true,
                width: 34,
                suppressSizeToFit: true,
                cellStyle: {'text-align': 'center', padding: '0px'},
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
                sortable: true,
                resizable: true,
                suppressSizeToFit: true,
                width: 70,
                cellStyle: {'text-align': 'center'}
            },
            {
                headerName: '권한',
                field: 'authority',
                sortable: true,
                resizable: true,
                suppressSizeToFit: true,
                width: 100
            },
            {
                headerName: '설명',
                field: 'description',
                sortable: true,
                resizable: true
            }
        ];

        this.getRowNodeId = function(data) {
            return data.authority;
        };
    }

    ngOnInit() {
        this.getAuthority();
    }

    private onEditButtonClick(e) {
        this.editButtonClicked.emit(e.rowData);
    }

    public getAuthority(params?: any): void {
        this.userService
            .getAuthorityList(params)
            .subscribe(
                (model: ResponseList<Authority>) => {
                    if (model.total > 0) {
                        this.authorityList = model.data;
                        this.sizeToFit();
                    } else {
                        this.authorityList = null;
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

    public test(event) {
        console.log(event);
    }

}
