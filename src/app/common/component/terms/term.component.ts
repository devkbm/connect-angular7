import { Component, OnInit, ViewChild } from '@angular/core';
import { TermGridComponent } from './term-grid.component';
import { TermFormComponent } from './term-form.component';
import { NzDrawerService, NzDrawerRef } from 'ng-zorro-antd';

@Component({
  selector: 'app-term',
  templateUrl: './term.component.html',
  styleUrls: ['./term.component.css']
})
export class TermComponent implements OnInit {

  drawerVisible = false;

  queryKey: string = 'term';
  queryValue: string = '';

  @ViewChild('termGrid')
  grid: TermGridComponent;

  @ViewChild('termForm')
  form: TermFormComponent;

  constructor() { }

  ngOnInit() {
  }

  openDrawer(): void {
    this.drawerVisible = true;
  }

  closeDrawer(): void {
    this.drawerVisible = false;
  }
    
  getTermList() {
    let params = null;
    if ( this.queryValue !== '') {
      params = new Object();
      params[this.queryKey] = this.queryValue;      
    }        

    this.closeDrawer();
    this.grid.getTermList(params);
  }

  initForm() {
    this.form.termForm.reset();
    this.openDrawer();
  }

  saveTerm() {
    this.form.submitTerm();    
  }

  deleteTerm() {
    this.form.deleteTerm();    
  }

  selectedItem(item) {    
    this.form.termForm.patchValue(item);     
  }  

  editDrawerOpen(item) {
    this.form.termForm.patchValue(item);  
    this.openDrawer();   
  }

}
