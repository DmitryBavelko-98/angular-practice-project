import {AbstractControl, AsyncValidatorFn, ValidationErrors} from '@angular/forms';
import { map, Observable } from 'rxjs';
import { IUserCredentials } from '../../authorization/models/user-credentials';
import { AuthorizationService } from './authorization.service';

export function uniqueUser(authService: AuthorizationService): AsyncValidatorFn {
    return (control: AbstractControl) : Observable<ValidationErrors | null> => {

        return authService.getUsers()
            .pipe(
                map((users: IUserCredentials[]) => {
                    const names = users.map(user => user.userName);

                    return (names.includes(control.value)) 
                        ? {userExists: true}
                        : null;
                })
            )
    }
}