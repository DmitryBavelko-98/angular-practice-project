import { Directive } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { Observable, map, of } from 'rxjs';
import { UserService } from '../../user/services/user.service'; 

@Directive({
  selector: '[appUniqueEmailValidator]',
  providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: UniqueEmailValidatorDirective, multi: true}]
})
export class UniqueEmailValidatorDirective {
  constructor(private userService: UserService) {}

  validate(id: number | null): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.emailExists(id, control.value).pipe(
        map(res => {
          return res ? {emailExists: true} : null
        })
      );
    }
  }

  private emailExists(id: number | null, email: string): Observable<boolean> {

    return this.userService.getUsers()
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
