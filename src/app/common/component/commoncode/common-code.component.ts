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

  openDrawer(): void {
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
    this.grid.getProgramList(params);
  }

  initForm() {
    this.form.programForm.reset();
    this.openDrawer();
  }

  saveProgram() {
    this.form.submitProgram();
  }

  deleteProgram() {
    this.form.deleteProgram();
  }

  selectedItem(item) {
    this.form.programForm.patchValue(item);     
  }  

  editDrawerOpen(item) {
    this.form.programForm.patchValue(item);  
    this.openDrawer();   
  }

}
