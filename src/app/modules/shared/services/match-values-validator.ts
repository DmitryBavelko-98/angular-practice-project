import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function matchValues(firstControl: AbstractControl, secondControl: AbstractControl): ValidatorFn {
    return (group: AbstractControl) : ValidationErrors | null => {
        if (firstControl.value !== secondControl.value) {
            secondControl.setErrors({valuesDontMatch: true});

            return {valuesDontMatch: true};
        }

        return null;
    }
}