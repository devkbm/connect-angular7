import { Injectable } from '@angular/core';
import { ButtonRendererComponent } from './renderer/button-renderer.component';
import { CheckboxRendererComponent } from './renderer/checkbox-renderer.component';

@Injectable()
export class AggridFunction {

    protected getRowNodeId;
    protected gridApi;
    protected gridColumnApi;
    protected frameworkComponents: any;

    protected columnDefs: object[];
    protected defaultColDef: {};


    protected style = {
        width: '100%',
        height: '100%'
    };

    constructor() {
        this.frameworkComponents = {
            buttonRenderer: ButtonRendererComponent,
            checkboxRenderer: CheckboxRendererComponent
        };
    }

    protected onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;        
    }

    protected setWidthAndHeight(width, height) {
        this.style = {
            width: width,
            height: height
        };
    }

    public getSelectedRows() {
        return this.gridApi.getSelectedRows();
    }

    /**
     * @description index에 해당하는 rowNode를 리턴한다.
     * @param index 행번호
     * @return rowNode
     */
    public getRowNodeByIndex(index: number) {
        return this.gridApi.getDisplayedRowAtIndex(index);
    }

    /**
     * @description id에 해당하는 rowNode를 리턴한다.
     * @param id id
     * @return rowNode
     */
    public getRowNode(id) {
        return this.gridApi.getRowNode(id);
    }

    /**
     * @description 특정 CELL을 선택한다.
     * @param rowIndex 행번호
     * @param colKey column key
     */
    public selectCell(rowIndex: number, colKey: string) {
        this.gridApi.setFocusedCell(rowIndex, colKey);
    }

    /**
     * @description 특정 행을 선택한다.
     * @param rowIndex 행번호
     */
    public selectRow(rowIndex: number) {
        this.gridApi.forEachNode( (node) => {
            if (node.rowIndex === rowIndex) {
                node.setSelected(true);
            }
        });
    }

    /**
     * @description 행추가
     * @param newItem Object
     */
    public addRow(newItem: object) {
        const res = this.gridApi.updateRowData({ add: [newItem] });
    }

    /**
     * @description 그리드 초기화
     */
    public clearData() {
        this.gridApi.setRowData([]);
    }

    /**
     * @description 특정 컬럼에 data를 입력한다.
     * @param rowNode rowNode 객체
     * @param colnm column key
     * @param data data
     */
    public setCellData(rowNode, colnm, data) {
        rowNode.setDataValue(colnm, data);
    }

    /**
     * @description 특정 row에 data를 입력한다.
     * @param rowNode  rowNode 객체
     * @param data row에 적용될 data(객체)
     */
    public setRowData(rowNode: any, data: object) {
        rowNode.setData(data);
    }

    public autoSizeAll(): void {
        const allColumnIds = [];
        this.gridColumnApi.getAllColumns().forEach(function(column) {
            allColumnIds.push(column.colId);
        });
        this.gridColumnApi.autoSizeColumns(allColumnIds);
    }

    public sizeToFit(): void {
        if (this.gridApi == null) {
            return;
        }
        this.gridApi.sizeColumnsToFit();
    }

}
