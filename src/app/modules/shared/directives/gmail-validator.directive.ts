import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appEmailValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: GmailValidatorDirective, multi: true}]
})
export class GmailValidatorDirective implements Validator {

  validate(control: AbstractControl): ValidationErrors | null {
    return (control.value && !control.value.endsWith('@gmail.com')) 
      ? {gmail: true} : null;
  }
  
}
