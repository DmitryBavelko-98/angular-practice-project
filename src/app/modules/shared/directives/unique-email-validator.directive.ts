import { Directive } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { Observable, of, delay, map, catchError } from 'rxjs';
import { USERS } from '../../user/mocks/users';

@Directive({
  selector: '[appUniqueEmailValidator]',
  providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: UniqueEmailValidatorDirective, multi: true}]
})
export class UniqueEmailValidatorDirective implements AsyncValidator {

  validate(control: AbstractControl): Observable<ValidationErrors> {
    return this.emailExists(control.value).pipe(
      map(res => (res ? {emailExists: true} : null)),
      catchError(err => err)
    ) as Observable<ValidationErrors>;
  }

  private emailExists(email: string): Observable<boolean> {
    return of(email).pipe(
      delay(500),
      map(() => {
        const emails = USERS.map(user => user.email.toLowerCase());
        return emails.includes(email.toLowerCase());
      })
    );
  }

}
