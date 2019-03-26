import { MenuGroupFormComponent } from './menu-group-form.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuGroupGridComponent } from './menu-group-grid.component';
import { MenuGridComponent } from './menu-grid.component';
import { MenuFormComponent } from './menu-form.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  protected menuGroupFormVisible = false;
  protected menuFormVisible = false;
  protected selectedMenuGroupCode: string = null;

  menuGroupQueryKey: string = 'menuGroupCode';
  menuGroupQueryValue: string = '';  
  menuQueryKey: string = 'menuCode';
  menuQueryValue: string = '';

  @ViewChild('menuGroupGrid')
  menuGroupGrid: MenuGroupGridComponent;

  @ViewChild('menuGroupForm')
  menuGroupForm: MenuGroupFormComponent;

  @ViewChild('menuGrid')
  menuGrid: MenuGridComponent;

  @ViewChild('menuForm')
  menuForm: MenuFormComponent;

  constructor() { }

  ngOnInit() {
  }

  menuGroupFormOpen(item): void {
    this.menuGroupFormVisible = true;
    //console.log(item);
    this.menuGroupForm.getMenuGroup(item.menuGroupCode);
    //this.menuGroupForm.menuGroupForm.patchValue(item);
  }

  menuGroupFormClose(): void {
    this.menuGroupFormVisible = false;
  }

  menuFormOpen(item): void {
    this.menuFormVisible = true;

    this.menuForm.getMenu(item.menuCode);
  }

  menuFormClose(): void {
    this.menuFormVisible = false;
  }

  getMenuGroupList(): void {
    let params = null;
    if ( this.menuGroupQueryValue !== '') {
      params = new Object();
      params[this.menuGroupQueryKey] = this.menuGroupQueryValue;      
    }        

    this.menuGroupFormClose();
    this.menuGrid.clearData();
    this.menuGroupGrid.getMenuGroupList(params);
  }

  getMenuList(): void {
    let params = new Object();

    params['menuGroupCode'] = this.selectedMenuGroupCode;

    if ( this.menuQueryValue !== '') {      
      params[this.menuQueryKey] = this.menuQueryValue;      
    }                

    this.menuFormClose();
    this.menuGrid.getMenuList(params);
  }

  selectMenuGroup(item): void {
    this.selectedMenuGroupCode = item.menuGroupCode;
    this.getMenuList();
  }


}
