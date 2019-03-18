import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import { MenuService } from '../../service/menu.service';
import { ProgramService } from '../../service/program.service';
import { AppAlarmService } from '../../service/app-alarm.service';

import { ResponseList } from '../../model/response-list';
import { ResponseObject } from '../../model/response-object';
import { Menu } from '../../model/menu';
import { Program } from '../../model/Program';
import { MenuHierarchy } from '../../model/menu-hierarchy';
import { MenuGroup } from '../../model/menu-group';

@Component({
  selector: 'app-menu-form',
  templateUrl: './menu-form.component.html',
  styleUrls: ['./menu-form.component.css']
})
export class MenuFormComponent implements OnInit {

  protected menuForm: FormGroup;
  protected programList;
  protected menuGroupList;
  protected menuTypeList;

  /**
   * 상위 메뉴 트리
  */
  menuHiererachy: MenuHierarchy[];

  @Input()
  menuGroupCode: string;

  @Output()
  formSaved = new EventEmitter();

  @Output()
  formDeleted = new EventEmitter();

  @Output()
  formClosed = new EventEmitter();

  constructor(private fb: FormBuilder,
              private menuService: MenuService,
              private programService: ProgramService,
              private appAlarmService: AppAlarmService) { }

  ngOnInit() {

    this.menuForm = this.fb.group({
      menuGroupCode     : [ null, [ Validators.required ] ],
      menuCode          : [ null, [ Validators.required ] ],
      menuName          : [ null, [ Validators.required ] ],
      menuType          : [ null, [ Validators.required ] ],
      parentMenuCode    : [ null ],
      sequence          : [ null ],
      program           : [ null ]
    });

    this.getMenuTypeList();
    this.getProgramList();
    this.getMenuGroupList();
  }

  public getMenu(menuGroupCode: string, menuCode: string) {

    this.menuService
      .getMenu(menuGroupCode, menuCode)
      .subscribe(
        (model: ResponseObject<Menu>) => {
          console.log(model);
          if ( model.total > 0 ) {
            this.menuForm.patchValue(model.data);
          } else {
            this.menuForm.reset();
          }
          this.appAlarmService.changeMessage(model.message);
        },
        (err) => {
          console.log(err);
        },
        () => { }
      );
  }

  private submitMenu() {
    this.menuService
      .registerMenu(this.menuForm.value)
      .subscribe(
        (model: ResponseObject<Menu>) => {
          this.formSaved.emit(this.menuForm.value);
          this.appAlarmService.changeMessage(model.message);
        },
        (err) => {
          console.log(err);
        },
        () => { }
      );
  }

  private deleteMenu(): void {
    this.menuService
      .deleteMenu(this.menuForm.value)
      .subscribe(
        (model: ResponseObject<Menu>) => {
          this.formDeleted.emit(this.menuForm.value);
          this.appAlarmService.changeMessage(model.message);
        },
        (err) => {
          console.log(err);
        },
        () => { }
      );
  }

  public closeForm() {
    this.formClosed.emit(this.menuForm.value);
  }

  private getMenuHierarchy(menuGroupCode: string): void {

    this.menuService
      .getMenuHierarchy(menuGroupCode)
      .subscribe(
        (model: ResponseList<MenuHierarchy>) => {
          if ( model.total > 0 ) {
            this.menuHiererachy = model.data;
          } else {
            this.menuHiererachy = null;
          }
        },
        (err) => {
          console.log(err);
        },
        () => { }
      );
  }

  private getProgramList(): void {
    this.programService
      .getProgramList()
      .subscribe(
        (model: ResponseList<Program>) => {
          if (model.total > 0) {
            this.programList = model.data;
          } else {
            this.programList = null;
          }
        },
        (err) => {
          console.log(err);
        },
        () => {}
      );
  }

  private getMenuGroupList(): void {
    this.menuService
      .getMenuGroupList()
      .subscribe(
        (model: ResponseList<MenuGroup>) => {
          console.log(model.data);
          if (model.total > 0) {
            this.menuGroupList = model.data;
          } else {
            this.menuGroupList = null;
          }
        },
        (err) => {
          console.log(err);
        },
        () => {}
      );
  }

  private getMenuTypeList(): void {
    this.menuService
      .getMenuTypeList()
      .subscribe(
        (model: ResponseList<any>) => {
          if (model.total > 0) {
            this.menuTypeList = model.data;
          } else {
            this.menuTypeList = null;
          }
        },
        (err) => {
          console.log(err);
        },
        () => {}
      );
  }

  private selectMenuGroup(menuGroupCode): void {
    this.getMenuHierarchy(menuGroupCode);
  }

}
