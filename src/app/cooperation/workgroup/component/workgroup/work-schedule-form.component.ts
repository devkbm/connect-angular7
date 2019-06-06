import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import { ResponseObject } from '../../../../common/model/response-object';
import { FormBase, FormType } from '../../../../common/form/form-base';
import { WorkGroupService } from '../../service/workgroup.service';
import { WorkGroup } from '../../model/workgroup';
import { ResponseList } from 'src/app/common/model/response-list';
import { WorkGroupMember } from '../../model/workgroup-member';

@Component({
selector: 'app-work-schedule-form',
templateUrl: './work-schedule-form.component.html',
styleUrls: ['./work-schedule-form.component.css']
})
export class WorkScheduleFormComponent extends FormBase implements OnInit {

    /**
     * Xs < 576px span size
     * Sm >= 576px span size
     */
    formLabelXs = 24;
    formControlXs = 24;

    formLabelSm = 24;
    fromControlSm = 24;

    form: FormGroup;

    memberList;

    constructor(private fb: FormBuilder,
                private workGroupService: WorkGroupService) { super(); }

    ngOnInit() {
        this.getAllMember();

        this.newForm();
    }

    //#region public methods

    public newForm(): void {
        this.formType = FormType.NEW;

        this.form = this.fb.group({
            id              : [ null ],
            title           : [ null, [ Validators.required ] ],
            start           : [ null, [ Validators.required ] ],
            end             : [ null, [ Validators.required ] ],
            allDay          : [ null, [ Validators.required ] ],
            workGroupId     : [ null, [ Validators.required ] ]
        });

    }

    public modifyForm(formData: WorkGroup): void {
        this.formType = FormType.MODIFY;

        this.form = this.fb.group({
            id              : new FormControl({value: null, disabled: true}),
            title           : [ null, [ Validators.required ] ],
            start           : [ null, [ Validators.required ] ],
            end             : [ null, [ Validators.required ] ],
            allDay          : [ null, [ Validators.required ] ],
            workGroupId     : [ null, [ Validators.required ] ]
        });

        this.form.patchValue(formData);
    }

    public getWorkGroup(id: number): void {
        this.workGroupService.getWorkGroup(id)
        .subscribe(
            (model: ResponseObject<WorkGroup>) => {
            if (model.data) {
                this.modifyForm(model.data);
            } else {
                this.newForm();
            }
            },
            (err) => {},
            () => {}
        );
    }

    public saveWorkGroup(): void {                
        this.workGroupService
        .saveWorkGroup(this.form.getRawValue())
        .subscribe(
            (model: ResponseObject<WorkGroup>) => {
            this.formSaved.emit(this.form.getRawValue());
            },
            (err) => {
            console.log(err);
            },
            () => {
            console.log('완료');
            }
        );
    }

    public deleteWorkGroup(id: number): void {
        this.workGroupService.deleteWorkGroup(id)
        .subscribe(
            (model: ResponseObject<WorkGroup>) => {
                this.formDeleted.emit(this.form.getRawValue());
            },
            (err) => {},
            () => {}
        );
    }

    public closeForm() {
        this.formClosed.emit(this.form.getRawValue());
    }

    public getAllMember(): void {
        this.workGroupService.getMemberList()
        .subscribe(
            (model: ResponseList<WorkGroupMember>) => {
            if (model.data) {
                this.memberList = model.data;
            } else {
                this.memberList = [];
            }
            },
            (err) => {},
            () => {}
        );
    }

    //#endregion

}
