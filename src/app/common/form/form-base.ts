import { FormGroup } from '@angular/forms';

class FormBase {

    public isFieldErrors(form: FormGroup, fieldName: string, errorName: string): boolean {
        return form.get(fieldName).dirty
            && form.get(fieldName).hasError(errorName) ? true : false;
    }
}
