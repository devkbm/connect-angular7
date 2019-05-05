import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import { DeptService } from '../../service/dept.service';
import { AppAlarmService } from '../../service/app-alarm.service';

import { ResponseObject } from '../../model/response-object';
import { FormBase, FormType } from '../../form/form-base';
import { Dept } from '../../model/dept';
import { DeptHierarchy } from '../../model/dept-hierarchy';
import { ResponseList } from '../../model/response-list';



@Component({
  selector: 'app-dept-form',
  templateUrl: './dept-form.component.html',
  styleUrls: ['./dept-form.component.css']
})
export class DeptFormComponent extends FormBase implements OnInit {

  deptForm: FormGroup;

  deptHierarchy: DeptHierarchy[];

  /**
   * Xs < 576px span size
   * Sm >= 576px span size
   */
  formLabelXs = 24;
  formLabelSm = 4;

  formControlXs = 24;
  formControlSm = 20;

  @Output()
  formSaved = new EventEmitter();

  @Output()
  formDeleted = new EventEmitter();

  @Output()
  formClosed = new EventEmitter();

  constructor(private fb: FormBuilder,
              private deptService: DeptService,
              private appAlarmService: AppAlarmService) { super(); }

  ngOnInit() {
    this.getDeptHierarchy();
    this.newForm();
  }

  public newForm(): void {
    this.formType = FormType.NEW;

    this.deptForm = this.fb.group({
      parentDeptCode          : [ null ],
      deptCode                : [ null ],
      deptNameKorean          : [ null ],
      deptAbbreviationKorean  : [ null, [ Validators.required ] ],
      deptNameEnglish         : [ null, [ Validators.required ] ],
      deptAbbreviationEnglish : [ null ],
      fromDate                : [ null ],
      toDate                  : [ null ],
      seq                     : [ 1    ],
      comment                 : [ null ]
    });
  }

  public modifyForm(formData: Dept): void {
    this.formType = FormType.MODIFY;

    this.deptForm = this.fb.group({
      parentDeptCode          : [ null ],
      deptCode                : new FormControl({value: null, disabled: true}, {validators: Validators.required}),
      deptNameKorean          : [ null ],
      deptAbbreviationKorean  : [ null, [ Validators.required ] ],
      deptNameEnglish         : [ null, [ Validators.required ] ],
      deptAbbreviationEnglish : [ null ],
      fromDate                : [ null ],
      toDate                  : [ null ],
      seq                     : [ 1    ],
      comment                 : [ null ]
    });

    this.deptForm.patchValue(formData);
  }

  public getDept(id: string) {
    this.deptService
        .getDept(id)
        .subscribe(
            (model: ResponseObject<Dept>) => {
              if ( model.total > 0 ) {
                this.modifyForm(model.data);
              } else {
                this.newForm();
              }
              this.appAlarmService.changeMessage(model.message);
            },
            (err) => {
              console.log(err);
            },
            () => {}
        );
  }

  public getDeptHierarchy(): void {
    this.deptService
        .getDeptHierarchyList()
        .subscribe(
            (model: ResponseList<DeptHierarchy>) => {
                if ( model.total > 0 ) {
                this.deptHierarchy = model.data;
                } else {
                this.deptHierarchy = [];
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

  public submitDept() {
    this.deptService
        .saveDept(this.deptForm.getRawValue())
        .subscribe(
          (model: ResponseObject<Dept>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formSaved.emit(this.deptForm.getRawValue());
          },
          (err) => {
            console.log(err);
          },
          () => {}
        );
  }

  public deleteDept() {
    this.deptService
        .deleteDept(this.deptForm.get('deptCode').value)
        .subscribe(
            (model: ResponseObject<Dept>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formDeleted.emit(this.deptForm.getRawValue());
            },
            (err) => {
            console.log(err);
            },
            () => {}
        );
  }

  public closeForm() {
    this.formClosed.emit(this.deptForm.getRawValue());
  }

}
