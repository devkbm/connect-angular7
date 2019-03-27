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
import { existingMenuGroupValidator } from '../../validator/menu-group-duplication-validator.directive';
import { FormBase, FormType } from '../../form/form-base';

@Component({
  selector: 'app-menu-group-form',
  templateUrl: './menu-group-form.component.html',
  styleUrls: ['./menu-group-form.component.css']
})
export class MenuGroupFormComponent extends FormBase implements OnInit {

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
              private appAlarmService: AppAlarmService) { super(); }

  ngOnInit() {    
    this.createForm();
  }

  public createForm() {
    this.formType = FormType.NEW;
    this.menuGroupForm = this.fb.group({
                          menuGroupCode   : new FormControl(null, {
                                                                    validators: Validators.required,
                                                                    asyncValidators: [existingMenuGroupValidator(this.menuService)],
                                                                    updateOn: 'blur'
                                                                  }),
                          menuGroupName   : [ null, [ Validators.required ] ],
                          description     : [ null]
                        });    
  }

  public updateForm() {
    this.formType = FormType.MODIFY;
    this.menuGroupForm =  this.fb.group({
      menuGroupCode   : new FormControl({value: null, disabled: true}, {validators: Validators.required}),
      menuGroupName   : [ null, [ Validators.required ] ],
      description     : [ null ]
    });    
  }  

  public getMenuGroup(menuGroupCode: string) {
    this.menuService
      .getMenuGroup(menuGroupCode)
      .subscribe(
        (model: ResponseObject<MenuGroup>) => {
          if ( model.total > 0 ) {
            this.updateForm();            
            this.menuGroupForm.patchValue(model.data);
          } else {
            this.createForm();
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
