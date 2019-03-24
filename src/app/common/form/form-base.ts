import { FormGroup } from '@angular/forms';

export class FormBase {

    protected formStatus: FormStatus;

    constructor() { }

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
