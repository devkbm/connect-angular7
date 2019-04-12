import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import { CommonCodeService } from '../../service/common-code.service';
import { AppAlarmService } from '../../service/app-alarm.service';

import { ResponseObject } from '../../model/response-object';
import { CommonCode } from '../../model/common-code';
import { CommonCodeHierarchy } from '../../model/common-code-hierarchy';
import { ResponseList } from '../../model/response-list';
import { FormBase, FormType } from '../../form/form-base';


@Component({
  selector: 'app-common-code-form',
  templateUrl: './common-code-form.component.html',
  styleUrls: ['./common-code-form.component.css']
})
export class CommonCodeFormComponent extends FormBase implements OnInit {

  codeForm: FormGroup;
  nodeItems: CommonCodeHierarchy[];

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
              private commonCodeService: CommonCodeService,
              private appAlarmService: AppAlarmService) { super(); }

  ngOnInit() {
    this.newForm();
    this.getCommonCodeHierarchy();
  }

  public newForm(): void {
    this.formType = FormType.NEW;

    this.codeForm = this.fb.group({
      id                      : [ null ],
      parentId                : [ null ],
      code                    : [ null, [ Validators.required ] ],
      codeName                : [ null, [ Validators.required ] ],
      codeNameAbbreviation    : [ null ],
      fromDate                : [ null ],
      toDate                  : [ null ],
      seq                     : [ 1    ],
      hierarchyLevel          : [ 1    ],
      fixedLengthYn           : [ null ],
      codeLength              : [ null ],
      cmt                     : [ null ]
    });
  }

  public modifyForm(formData: CommonCode): void {
    this.formType = FormType.MODIFY;

    this.codeForm = this.fb.group({
      id                      : [ null ],
      parentId                : [ null ],
      code                    : new FormControl({value: null, disabled: true}, {validators: Validators.required}),
      codeName                : [ null, [ Validators.required ] ],
      codeNameAbbreviation    : [ null ],
      fromDate                : [ null ],
      toDate                  : [ null ],
      seq                     : [ 1    ],
      hierarchyLevel          : [ 1    ],
      fixedLengthYn           : [ null ],
      codeLength              : [ null ],
      cmt                     : [ null ]
    });

    this.codeForm.patchValue(formData);
  }

  public getCommonCode(id: string) {
    this.commonCodeService
        .getCommonCode(id)
        .subscribe(
            (model: ResponseObject<CommonCode>) => {
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

  getCommonCodeHierarchy() {
    this.commonCodeService
        .getCommonCodeHierarchy()
        .subscribe(
            (model: ResponseList<CommonCodeHierarchy>) => {
                if ( model.total > 0 ) {
                this.nodeItems = model.data;
                } else {
                this.nodeItems = new Array<CommonCodeHierarchy>(0);
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

  public submitCommonCode() {
    this.commonCodeService
        .registerCommonCode(this.codeForm.getRawValue())
        .subscribe(
          (model: ResponseObject<CommonCode>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formSaved.emit(this.codeForm.getRawValue());
          },
          (err) => {
            console.log(err);
          },
          () => {}
        );
  }

  public deleteCommonCode() {
    this.commonCodeService
        .deleteCommonCode(this.codeForm.get('id').value)
        .subscribe(
            (model: ResponseObject<CommonCode>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formDeleted.emit(this.codeForm.getRawValue());
            },
            (err) => {
            console.log(err);
            },
            () => {}
        );
  }

  public closeForm() {
    this.formClosed.emit(this.codeForm.getRawValue());
  }

}
