import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import { ProgramService } from '../../service/program.service';
import { AppAlarmService } from '../../service/app-alarm.service';

import { ResponseObject } from '../../model/response-object';
import { WebResource } from '../../model/web-resource';
import { FormBase, FormType } from '../../form/form-base';
import { existingWebResourceValidator } from '../../validator/web-resource-duplication-validator.directive';

@Component({
  selector: 'app-program-form',
  templateUrl: './program-form.component.html',
  styleUrls: ['./program-form.component.css']
})
export class ProgramFormComponent extends FormBase implements OnInit {

  programForm: FormGroup;

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
              private programService: ProgramService,
              private appAlarmService: AppAlarmService) { super(); }

  ngOnInit() {
    this.newForm();
  }

  public newForm(): void {
    this.formType = FormType.NEW;

    this.programForm = this.fb.group({
      resourceCode  : new FormControl(null, {
                                              validators: Validators.required,
                                              asyncValidators: [existingWebResourceValidator(this.programService)],
                                              updateOn: 'blur'
                                            }),
      resourceName  : [ null, [ Validators.required ] ],
      resourceType  : [ null, [ Validators.required ] ],
      url           : [ null, [ Validators.required ] ],
      description   : [ null]
    });
  }

  public modifyForm(formData: WebResource): void {
    this.formType = FormType.MODIFY;

    this.programForm = this.fb.group({
      resourceCode  : new FormControl({value: null, disabled: true}, {validators: Validators.required}),
      resourceName  : [ null, [ Validators.required ] ],
      resourceType  : [ null, [ Validators.required ] ],
      url           : [ null, [ Validators.required ] ],
      description   : [ null]
    });

    this.programForm.patchValue(formData);
  }

  public getProgram(id: string) {
    this.programService
      .getProgram(id)
      .subscribe(
        (model: ResponseObject<WebResource>) => {
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

  public submitProgram() {
    this.programService
        .registerProgram(this.programForm.getRawValue())
        .subscribe(
          (model: ResponseObject<WebResource>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formSaved.emit(this.programForm.getRawValue());
          },
          (err) => {
            console.log(err);
          },
          () => {}
        );
  }

  public deleteProgram() {
    this.programService
      .deleteProgram(this.programForm.get('resourceCode').value)
      .subscribe(
        (model: ResponseObject<WebResource>) => {
          this.appAlarmService.changeMessage(model.message);
          this.formDeleted.emit(this.programForm.getRawValue());
        },
        (err) => {
          console.log(err);
        },
        () => {}
      );
  }

  public closeForm() {
    this.formClosed.emit(this.programForm.getRawValue());
  }

}
