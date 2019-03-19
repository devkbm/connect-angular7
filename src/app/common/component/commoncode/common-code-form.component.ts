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


@Component({
  selector: 'app-common-code-form',
  templateUrl: './common-code-form.component.html',
  styleUrls: ['./common-code-form.component.css']
})
export class CommonCodeFormComponent implements OnInit {

  codeForm: FormGroup;

  @Output()
  formSaved = new EventEmitter();

  @Output()
  formDeleted = new EventEmitter();

  @Output()
  formClosed = new EventEmitter();

  constructor(private fb: FormBuilder,
              private commonCodeService: CommonCodeService,
              private appAlarmService: AppAlarmService) { }

  ngOnInit() {

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

  public isFieldErrors(fieldName: string): boolean {
    return this.codeForm.get(fieldName).dirty 
        && this.codeForm.get(fieldName).errors ? true : false;
  }

  public getCommonCode() {
    this.commonCodeService
        .getCommonCode(this.codeForm.get('id').value)
        .subscribe(
            (model: ResponseObject<CommonCode>) => {
              if ( model.total > 0 ) {
                this.codeForm.patchValue(model.data);
              } else {
                this.codeForm.reset();
              }
              this.appAlarmService.changeMessage(model.message);
            },
            (err) => {
              console.log(err);
            },
            () => {}
        );
  }

  public submitCommonCode() {
    this.commonCodeService
        .registerCommonCode(this.codeForm.value)        
        .subscribe(
          (model: ResponseObject<CommonCode>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formSaved.emit(this.codeForm.value);
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
            this.formDeleted.emit(this.codeForm.value);
            },
            (err) => {
            console.log(err);
            },
            () => {}
        );
  }

  public closeForm() {
    this.formClosed.emit(this.codeForm.value);
  }

}
