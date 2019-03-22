import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import { MenuService } from '../../service/menu.service';
import { AppAlarmService } from '../../service/app-alarm.service';
import { NzMessageService } from 'ng-zorro-antd';

import { ResponseObject } from '../../model/response-object';
import { MenuGroup } from '../../model/menu-group';

@Component({
  selector: 'app-menu-group-form',
  templateUrl: './menu-group-form.component.html',
  styleUrls: ['./menu-group-form.component.css']
})
export class MenuGroupFormComponent implements OnInit {

  menuGroupForm: FormGroup;

  /**
   * Xs < 576px span size
   * Sm >= 576px span size
   */
  formLabelXs = 24;
  formControlXs = 24;

  formLabelSm = 4;
  fromControlSm = 20;

  @Output()
  formSaved = new EventEmitter();

  @Output()
  formDeleted = new EventEmitter();

  @Output()
  formClosed = new EventEmitter();

  constructor(private fb: FormBuilder,
              private menuService: MenuService,
              private appAlarmService: AppAlarmService) { }

  ngOnInit() {
    this.menuGroupForm = this.fb.group({
      menuGroupCode   : [ null, [ Validators.required ] ],
      menuGroupName   : [ null, [ Validators.required ] ],
      description     : [ null]
    });
  }

  public isFieldErrors(fieldName: string, errorName: string): boolean {
    return this.menuGroupForm.get(fieldName).dirty
        && this.menuGroupForm.get(fieldName).hasError(errorName) ? true : false;
  }

  private getMenuGroup(menuGroupCode: string) {
    this.menuService
      .getMenuGroup(menuGroupCode)
      .subscribe(
        (model: ResponseObject<MenuGroup>) => {
          if ( model.total > 0 ) {
            this.menuGroupForm.patchValue(model.data);
          } else {
            this.menuGroupForm.reset();
          }
          this.appAlarmService.changeMessage(model.total + '건의 메뉴그룹이 조회되었습니다.');
        },
        (err) => {
          console.log(err);
        },
        () => { }
      );
  }

  private submitMenuGroup() {
    this.menuService
      .registerMenuGroup(this.menuGroupForm.value)
      .subscribe(
        (model: ResponseObject<MenuGroup>) => {
          this.formSaved.emit(this.menuGroupForm.value);
          this.appAlarmService.changeMessage(model.total + '건의 메뉴그룹이 저장되었습니다.');
        },
        (err) => {
          console.log(err);
        },
        () => { }
      );
  }

  private deleteMenuGroup() {
    this.menuService
      .deleteMenuGroup(this.menuGroupForm.get('menuGroupCode').value)
      .subscribe(
        (model: ResponseObject<MenuGroup>) => {
          this.formDeleted.emit(this.menuGroupForm.value);
          this.appAlarmService.changeMessage(model.total + '건의 메뉴그룹이 삭제되었습니다.');
        },
        (err) => {
          console.log(err);
        },
        () => { }
      );
  }

  public closeForm() {
    this.formClosed.emit(this.menuGroupForm.value);
  }

}
