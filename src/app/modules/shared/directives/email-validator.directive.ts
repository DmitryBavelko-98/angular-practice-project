import { Directive } from '@angular/core';
import { FormControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appEmailValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: EmailValidatorDirective, multi: true}]
})
export class EmailValidatorDirective implements Validator {

  validate(control: FormControl): ValidationErrors | null {
    return (!control.value.endsWith('@gmail.com') && control.value && !control.hasError('email')) 
      ? {domen: true} : null;
  }
  
}
