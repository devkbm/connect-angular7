import { FormGroup } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';

export enum FormType {
    NEW = 'NEW',
    MODIFY = 'MODIFY'
}

export class FormBase {

    protected formType: FormType;
    
    @Output()
    formSaved = new EventEmitter();
  
    @Output()
    formDeleted = new EventEmitter();
  
    @Output()
    formClosed = new EventEmitter();

    constructor() {
        this.formType = FormType.NEW;
     }

    /**
     *
     * @param formGroup 폼그룹
     * @param fieldName 필드명
     * @param errorName 에러명
     */
    public isFieldErrors(formGroup: FormGroup, fieldName: string, errorName: string): boolean {
        return formGroup.get(fieldName).dirty
            && formGroup.get(fieldName).hasError(errorName) ? true : false;
    }
}
