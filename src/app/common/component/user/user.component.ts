import { Component, OnInit, ViewChild } from '@angular/core';
import { UserGridComponent } from './user-grid.component';
import { UserFormComponent } from './user-form.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  drawerVisible = false;

  queryKey = 'userId';
  queryValue = '';

  @ViewChild('userGrid')
  grid: UserGridComponent;

  @ViewChild('userForm')
  form: UserFormComponent;

  constructor() { }

  ngOnInit() {
  }

  closeDrawer() {
    this.drawerVisible = false;
  }

  openDrawer() {
    this.drawerVisible = true;
  }

  editDrawOpen(item) {
    this.form.getUser(item.userId);
    this.openDrawer();
  }

  getUserList() {
    let params = null;
    if ( this.queryValue !== '') {
      params = new Object();
      params[this.queryKey] = this.queryValue;
    }

    this.closeDrawer();
    this.grid.getUserList(params);
  }

  saveUser() {
    this.form.registerUser();
  }

  deleteUser() {    
    this.form.deleteUser(this.grid.getSelectedRow().userId);
  }

  initForm() {
    this.form.newForm();
    this.openDrawer();
  }

}
