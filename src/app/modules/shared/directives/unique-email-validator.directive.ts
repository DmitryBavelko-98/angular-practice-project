import { Directive } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { Observable, map, delay } from 'rxjs';
import { UserApiService } from '../../user/services/user-api.service';

@Directive({
  selector: '[appUniqueEmailValidator]',
  providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: UniqueEmailValidatorDirective, multi: true}]
})
export class UniqueEmailValidatorDirective {
  constructor(private userApi: UserApiService) {}

  validate(id: string | null): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.emailExists(id, control.value).pipe(
        delay(500),
        map(res => {
          return res ? {emailExists: true} : null
        })
      );
    }
  }

  private emailExists(id: string | null, email: string): Observable<boolean> {

    return this.userApi.getUsers()
      .pipe(
        map(users => {
          let emails;

          if (!id) {
            emails = users.map(user => user.email);
          } else {
            emails = users
              .map(user => (user.id === id) ? null : user.email)
              .filter(email => !!email === true);
          }

          return emails.includes(email);
        }),
      );
  }
}
