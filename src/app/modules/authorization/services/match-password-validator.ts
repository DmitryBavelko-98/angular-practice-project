import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function matchPasswords(): ValidatorFn {
    return (group: AbstractControl) : ValidationErrors | null => {
        return (group.value.password !== group.value.confirmPassword) 
            ? {passwordsDontMatch: true} 
            : null;
    }
}