import { Directive } from '@angular/core';
import { AsyncValidator, FormControl, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { Observable, of, delay, map, catchError } from 'rxjs';
import { USERS } from '../../user/mocks/users';

@Directive({
  selector: '[appUniqueEmailValidator]',
  providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: UniqueEmailValidatorDirective, multi: true}]
})
export class UniqueEmailValidatorDirective implements AsyncValidator {

  validate(control: FormControl): Observable<ValidationErrors> {
    return <Observable<ValidationErrors>>this.emailExists(control.value).pipe(
      map(res => (res ? {emailExists: true} : null)),
      catchError(async (err) => console.log(err))
    );
  }

  private emailExists(email: string): Observable<boolean> {
    return of(email).pipe(
      delay(500),
      map(() => {
        const emails = Array.from(USERS).map(user => user.email);
        return emails.includes(email);
      })
    );
  }

}
