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
import { WebResource } from '../../model/web-resource';
import { MenuHierarchy } from '../../model/menu-hierarchy';
import { MenuGroup } from '../../model/menu-group';
import { FormBase, FormType } from '../../form/form-base';
import { existingMenuValidator } from '../../validator/menu-duplication-validator.directive';

@Component({
  selector: 'app-menu-form',
  templateUrl: './menu-form.component.html',
  styleUrls: ['./menu-form.component.css']
})
export class MenuFormComponent extends FormBase implements OnInit {

  protected menuForm: FormGroup;
  protected programList;
  protected menuGroupList;
  protected menuTypeList;

  /**
   * 상위 메뉴 트리
   */
  menuHiererachy: MenuHierarchy[];

  /**
   * Xs < 576px span size
   * Sm >= 576px span size
   */
  formLabelXs = 24;
  formControlXs = 24;

  formLabelSm = 4;
  formControlSm = 20;

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
              private appAlarmService: AppAlarmService) {
    super();
    this.menuHiererachy = [];

    this.getMenuTypeList();
    this.getProgramList();
    this.getMenuGroupList();
  }

  ngOnInit() {

    this.newForm(null);
  }

  public newForm(menuGroupCode: string): void {
    this.formType = FormType.NEW;

    this.getMenuHierarchy(menuGroupCode);

    this.menuForm = this.fb.group({
      menuGroupCode     : [ menuGroupCode, [ Validators.required ] ],
      menuCode          : new FormControl(null, {
                                                  validators: Validators.required,
                                                  asyncValidators: [existingMenuValidator(this.menuService)],
                                                  updateOn: 'blur'
                                                }),
      menuName          : [ null, [ Validators.required ] ],
      menuType          : [ null, [ Validators.required ] ],
      parentMenuCode    : [ null ],
      sequence          : [ null ],
      resource          : [ null ]
    });
  }

  public modifyForm(formData: Menu): void {
    this.formType = FormType.MODIFY;

    this.getMenuHierarchy(formData.menuGroupCode);

    this.menuForm = this.fb.group({
      menuGroupCode     : [ null, [ Validators.required ] ],
      menuCode          : new FormControl({value: null, disabled: true}, {validators: Validators.required}),
      menuName          : [ null, [ Validators.required ] ],
      menuType          : [ null, [ Validators.required ] ],
      parentMenuCode    : [ null ],
      sequence          : [ null ],
      resource          : [ null ]
    });

    this.menuForm.patchValue(formData);
  }

  public getMenu(menuCode: string) {

    this.menuService
      .getMenu(menuCode)
      .subscribe(
        (model: ResponseObject<Menu>) => {
          if ( model.total > 0 ) {
            this.modifyForm(model.data);
          } else {
            this.newForm(null);
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
      .registerMenu(this.menuForm.getRawValue())
      .subscribe(
        (model: ResponseObject<Menu>) => {
          this.formSaved.emit(this.menuForm.getRawValue());
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
      .deleteMenu(this.menuForm.getRawValue())
      .subscribe(
        (model: ResponseObject<Menu>) => {
          this.formDeleted.emit(this.menuForm.getRawValue());
          this.appAlarmService.changeMessage(model.message);
        },
        (err) => {
          console.log(err);
        },
        () => { }
      );
  }

  public closeForm() {
    this.formClosed.emit(this.menuForm.getRawValue());
  }

  private getMenuHierarchy(menuGroupCode: string): void {

    this.menuService
      .getMenuHierarchy(menuGroupCode)
      .subscribe(
        (model: ResponseList<MenuHierarchy>) => {
          if ( model.total > 0 ) {
            this.menuHiererachy = model.data;
          } else {
            this.menuHiererachy = [];
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
        (model: ResponseList<WebResource>) => {
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
