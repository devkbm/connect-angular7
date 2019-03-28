import { Directive } from '@angular/core';
import { NG_ASYNC_VALIDATORS, AbstractControl, ValidationErrors, AsyncValidator, AsyncValidatorFn } from '@angular/forms';

import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { ProgramService } from '../service/program.service';

export function existingWebResourceValidator(programService: ProgramService): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return control.value ?
             programService.getProgramDupCheck(control.value)
                          .pipe(
                            map( responseObj => {
                              if ( responseObj.data === false ) {
                                return {exists: responseObj.message};
                              } else {
                                return null;
                              }
                            } )
                          ) : new Observable<null>();
  };
}
