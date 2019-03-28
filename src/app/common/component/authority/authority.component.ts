import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthorityGridComponent } from './authority-grid.component';
import { AuthorityFormComponent } from './authority-form.component';

@Component({
  selector: 'app-authority',
  templateUrl: './authority.component.html',
  styleUrls: ['./authority.component.css']
})
export class AuthorityComponent implements OnInit {

  drawerVisible = false;

  queryKey = 'authority';
  queryValue = '';

  @ViewChild('authGrid')
  grid: AuthorityGridComponent;

  @ViewChild('authForm')
  form: AuthorityFormComponent;

  constructor() { }

  ngOnInit() {
  }

  closeDrawer() {
    this.drawerVisible = false;
  }

  openDrawer() {
    this.drawerVisible = true;
  }

  selectedItem(item) {
    this.form.authorityForm.patchValue(item);
  }

  editDrawOpen(item) {
    this.form.getAuthority(item.authority);

    this.openDrawer();
  }

  getAuthorityList() {
    let params = null;
    if ( this.queryValue !== '') {
      params = new Object();
      params[this.queryKey] = this.queryValue;
    }

    this.closeDrawer();
    this.grid.getAuthority(params);
  }

  deleteAuthority() {
    this.form.deleteAuthority();
  }

  initForm() {
    this.form.newForm();
    this.openDrawer();
  }

}
