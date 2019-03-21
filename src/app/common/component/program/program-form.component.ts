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

@Component({
  selector: 'app-program-form',
  templateUrl: './program-form.component.html',
  styleUrls: ['./program-form.component.css']
})
export class ProgramFormComponent implements OnInit {

  programForm: FormGroup;

  @Output()
  formSaved = new EventEmitter();

  @Output()
  formDeleted = new EventEmitter();

  @Output()
  formClosed = new EventEmitter();

  constructor(private fb: FormBuilder,
              private programService: ProgramService,
              private appAlarmService: AppAlarmService) { }

  ngOnInit() {

    this.programForm = this.fb.group({
      resourceCode  : [ null, [ Validators.required ] ],
      resourceName  : [ null, [ Validators.required ] ],
      resourceType  : [ null, [ Validators.required ] ],
      url           : [ null, [ Validators.required ] ],
      description   : [ null]
    });
  }

  public isFieldErrors(fieldName: string): boolean {
    return this.programForm.get(fieldName).dirty 
        && this.programForm.get(fieldName).errors ? true : false;
  }


  public getProgram() {
    this.programService
      .getProgram(this.programForm.get('resourceCode').value)
      .subscribe(
        (model: ResponseObject<WebResource>) => {
          if ( model.total > 0 ) {
            this.programForm.patchValue(model.data);
          } else {
            this.programForm.reset();
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
        .registerProgram(this.programForm.value)
        .subscribe(
          (model: ResponseObject<WebResource>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formSaved.emit(this.programForm.value);
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
          this.formDeleted.emit(this.programForm.value);
        },
        (err) => {
          console.log(err);
        },
        () => {}
      );
  }

  public closeForm() {
    this.formClosed.emit(this.programForm.value);
  }

}
