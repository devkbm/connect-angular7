import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import { UserService } from '../../service/user.service';

import { AppAlarmService } from '../../service/app-alarm.service';
import { ResponseObject } from '../../model/response-object';
import { User } from '../../model/user-info';

import { AppError } from '../../error/app-error';
import { UserNotFoundError } from '../../error/user-not-found-error';
import { ResponseList } from '../../model/response-list';
import { Authority } from '../../model/authority';
import { MenuGroup } from '../../model/menu-group';
import { UserDuplicationValidatorDirective, existingUserValidator } from '../../validator/user-duplication-validator.directive';
import { UploadFile } from 'ng-zorro-antd';
import { FormType, FormBase } from '../../form/form-base';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent extends FormBase implements OnInit {

  public userForm: FormGroup;
  public authList;
  public menuGroupList;
  
  passwordConfirm: string;
  popup: boolean;


  showUploadList = {
    showPreviewIcon: true,
    showRemoveIcon : true,
    hidePreviewIconInNonImage: true
  };

  fileList = [
    /*{
      uid: -1,
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    }*/
  ];

  previewImage: string | undefined = '';
  previewVisible = false;
  imageUploadParam;

  imageBase64;
  isUploadable;

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
              private userService: UserService,
              private appAlarmService: AppAlarmService) { super(); }

  ngOnInit() {

    this.newForm();

    this.getAuthorityList();
    this.getMenuGroupList();

  }

  public newForm(): void {
    this.imageBase64 = null;
    this.previewImage = null;
    this.formType = FormType.NEW;

    this.userForm = this.fb.group({
      userId          : new FormControl(null, {
                                                validators: Validators.required,
                                                asyncValidators: [existingUserValidator(this.userService)],
                                                updateOn: 'blur'
                                              }),
      name            : [ null, [ Validators.required ] ],
      enabled         : [ true ],
      password        : [ null, [ Validators.required ] ],
      imageBase64     : [ null ],
      authorityList   : [ null ],
      menuGroupList   : [ null ]
    });
  }

  public modifyForm(): void {
    this.formType = FormType.MODIFY;

    this.userForm = this.fb.group({
      userId          : new FormControl({value: null, disabled: true}, {validators: Validators.required}),
      name            : [ null, [ Validators.required ] ],
      enabled         : [ true ],
      password        : [ null, [ Validators.required ] ],
      imageBase64     : [ null ],
      authorityList   : [ null ],
      menuGroupList   : [ null ]
    });
  }

  public getUser(userId: string) {
    this.userService
      .getUser(userId)
      .subscribe(
        (model: ResponseObject<User>) => {
          if (model.total > 0) {
            if (model.data.userId == null) {
              this.newForm();
            } else {
              this.modifyForm();            
              this.userForm.patchValue(model.data);
            }
            
            this.previewImage = null;
            this.imageUploadParam = {userId: model.data.userId};
            if (model.data.imageBase64.length > 0 ) {
              this.imageBase64 = 'data:image/jpg;base64,' + model.data.imageBase64;
              this.isUploadable = false;
            } else {
              this.imageBase64 = null;
              this.isUploadable = true;
            }            

          } else {
            this.userForm.reset();
          }          

          this.appAlarmService.changeMessage(model.message);
        },
        (err) => {
          console.log(err);
          this.userForm.reset();
        },
        () => {
          console.log('완료');
        }
      );
  }

  public registerUser() {
    
    /*for (const i in this.userForm.controls) {
      this.userForm.controls[ i ].markAsDirty();
      this.userForm.controls[ i ].updateValueAndValidity();      
    } */
    
    console.log(this.userForm);

    this.userService
      .registerUser(this.userForm.getRawValue())
      .subscribe(
        (model: ResponseObject<User>) => {
          this.appAlarmService.changeMessage(model.message);
          this.formSaved.emit(this.userForm.value);
        },
        (err) => {
          console.log(err);
        },
        () => {
          console.log('완료');
        }
      );
  }

  public deleteUser() {
    this.userService
      .deleteUser(this.userForm.value)
      .subscribe(
        (model: ResponseObject<User>) => {
          this.appAlarmService.changeMessage(model.message);
          this.formDeleted.emit(this.userForm.value);
        },
        (err) => {
          console.log(err);
        },
        () => {
          this.popup = false;
        }
      );
  }

  protected checkUser() {
    const userId: string = this.userForm.get('userId').value;

    this.userForm.get('userId').markAsDirty();
    this.userForm.get('userId').updateValueAndValidity();

    this.userService
      .checkUser(this.userForm.get('userId').value)
      .subscribe(
        (model: ResponseObject<boolean>) => {
          this.appAlarmService.changeMessage(model.message);
        },
        (err: AppError) => {
          if (err instanceof UserNotFoundError) {
            console.log('유저정보가 없음');
          }
        },
        () => {
          console.log('완료');
        }
      );
  }

  private validPassword(field) {

    /*if ( this.user.password === this.passwordConfirm) {
      // 폼 검증 수행해야 함
    } else {
      // 폼 검증 실패
    }*/

  }

  private getAuthorityList() {
    this.userService
      .getAuthorityList()
      .subscribe(
        (model: ResponseList<Authority>) => {
          if (model.total > 0) {
            this.authList = model.data;
          }
        },
        (err) => {
          console.log(err);
        },
        () => {
          console.log('완료');
        }
      );
  }

  private getMenuGroupList() {
    this.userService
      .getMenuGroupList()
      .subscribe(
        (model: ResponseList<MenuGroup>) => {
          if (model.total > 0) {
            this.menuGroupList = model.data;
          }
        },
        (err) => {
          console.log(err);
        },
        () => {
          console.log('완료');
        }
      );
  }

  public closeForm() {
    this.formClosed.emit(this.userForm.value);
  }

  handlePreview = (file: UploadFile) => {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  }

}
