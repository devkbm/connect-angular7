import { Component, OnInit, ViewChild } from '@angular/core';
import { NzDrawerService, NzDrawerRef } from 'ng-zorro-antd';
import { CommonCodeGridComponent } from './common-code-grid.component';
import { CommonCodeFormComponent } from './common-code-form.component';

@Component({
  selector: 'app-common-code',
  templateUrl: './common-code.component.html',
  styleUrls: ['./common-code.component.css']
})
export class CommonCodeComponent implements OnInit {

    drawerVisible = false;

    queryKey: string = 'programCode';
    queryValue: string = '';

    @ViewChild('commonCodeGrid')
    grid: CommonCodeGridComponent;

    @ViewChild('commonCodeForm')
    form: CommonCodeFormComponent;

    constructor() { }

    ngOnInit() {
    }

    openDrawer(id: string): void {
        if (id != null)
            this.form.getCommonCode(id);

        this.drawerVisible = true;        
    }

    closeDrawer(): void {
        this.drawerVisible = false;
    }
    
    getProgramList() {
        let params = null;
        if ( this.queryValue !== '') {
        params = new Object();
        params[this.queryKey] = this.queryValue;      
        }        

        this.closeDrawer();
        this.grid.getCommonCodeList(params);
    }

    initForm() {
        this.form.codeForm.reset();
        this.openDrawer(null);
    }

    saveProgram() {
        this.form.submitCommonCode();
    }

    deleteProgram() {
        this.form.submitCommonCode();
    }

    selectedItem(item) {
        console.log(item.id);        
        //this.form.getCommonCode(item.id);
    }  

    editDrawerOpen(item) {
        this.form.codeForm.patchValue(item);
        this.openDrawer(item.id);   
    }

}
