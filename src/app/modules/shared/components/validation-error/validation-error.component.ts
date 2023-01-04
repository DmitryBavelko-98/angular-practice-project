import { Component, Input } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-validation-error',
  templateUrl: './validation-error.component.html',
  styleUrls: ['./validation-error.component.scss']
})
export class ValidationErrorComponent {
  message: string = '';

  @Input() control!: AbstractControl | null;
  @Input() controlName!: string;

  showValidationMessage(): string {
    const errors: ValidationErrors = <ValidationErrors>this.control?.errors;

    switch(this.control?.invalid) {
      case errors.hasOwnProperty('required'): 
        this.message = 'Field must not be empty';
        break;
      case errors.hasOwnProperty('min'): 
        this.message = `Value should be ${errors!['min'].min} or more`;
        break;
      case errors.hasOwnProperty('max'): 
        this.message = `Value should be ${errors!['max'].max} or less`;
        break;
      case errors.hasOwnProperty('minlength'): 
        this.message = `Field must contain at least ${errors!['minlength'].requiredLength} characters`;
        break;
      case errors.hasOwnProperty('maxlength'): 
        this.message = `Field must contain no more than ${errors!['maxlength'].requiredLength} characters`;
        break;
      case errors.hasOwnProperty('email'): 
        this.message = 'Wrong email format';
        break;
      case errors.hasOwnProperty('gmail'): 
        this.message = 'Email should end with @gmail.com';
        break;
      case errors.hasOwnProperty('emailExists'): 
        this.message = 'User with this email already exists';
        break;
      default: this.message = 'Field is invalid';
    }

    return this.message; 
  }
}
