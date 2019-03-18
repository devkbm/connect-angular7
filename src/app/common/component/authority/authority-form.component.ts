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
import { Authority } from '../../model/authority';

@Component({
  selector: 'app-authority-form',
  templateUrl: './authority-form.component.html',
  styleUrls: ['./authority-form.component.css']
})
export class AuthorityFormComponent implements OnInit {

  authorityForm: FormGroup;

  @Output()
  formSaved = new EventEmitter();

  @Output()
  formDeleted = new EventEmitter();

  @Output()
  formClosed = new EventEmitter();


  constructor(private fb: FormBuilder,
              private userService: UserService,
              private appAlarmService: AppAlarmService) { }

  ngOnInit() {
    this.authorityForm = this.fb.group({
      authority     : [ null, [ Validators.required ] ],
      description   : [ null ]
    });
  }

  public getAuthority(): void {
    this.userService
      .getAuthority(this.authorityForm.get('authority').value)
      .subscribe(
        (model: ResponseObject<Authority>) => {
          if (model.total > 0) {
            this.authorityForm.patchValue(model.data);
          } else {
            this.authorityForm.reset();
          }
          this.appAlarmService.changeMessage(model.message);
        },
        (err) => {
          console.log(err);
        },
        () => {}
      );
  }

  public saveAuthority(): void {
    this.userService
      .registerAuthority(this.authorityForm.value)
      .subscribe(
        (model: ResponseObject<Authority>) => {
          this.appAlarmService.changeMessage(model.message);
          this.formSaved.emit(this.authorityForm.value);
        },
        (err) => {
          console.log(err);
        },
        () => {}
      );
  }

  public deleteAuthority(): void {
    this.userService
      .deleteAuthority(this.authorityForm.get('authority').value)
      .subscribe(
        (model: ResponseObject<Authority>) => {
          this.appAlarmService.changeMessage(model.message);
          this.formDeleted.emit(this.authorityForm.value);
        },
        (err) => {
          console.log(err);
        },
        () => {}
      );
  }

  public patchValues(values) {
    this.authorityForm.patchValue(values);
  }

  public closeForm() {
    this.formClosed.emit(this.authorityForm.value);
  }

}
