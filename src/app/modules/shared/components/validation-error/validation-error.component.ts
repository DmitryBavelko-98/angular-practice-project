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

    if (errors.hasOwnProperty('required')) {
      this.message = 'Field must not be empty';
    }
    if (errors.hasOwnProperty('min')) {
      this.message = `Value should be ${errors!['min'].min} or more`;
    }  
    if (errors.hasOwnProperty('max')) {
      this.message = `Value should be ${errors!['max'].max} or less`;
    } 
    if (errors.hasOwnProperty('minlength')) {
      this.message = `Field must contain at least ${errors!['minlength'].requiredLength} characters`;
    } 
    if (errors.hasOwnProperty('maxlength')) {
      this.message = `Field must contain no more than ${errors!['maxlength'].requiredLength} characters`;
    } 
    if (errors.hasOwnProperty('email')) {
      this.message = `Wrong email format`;
    } 
    if (errors.hasOwnProperty('domen')) {
      this.message = `Email should end with @gmail.com`;
    } 
    if (errors.hasOwnProperty('emailExists')) {
      this.message = `User with this email already exists`;
    } 

    return this.message; 
  }
}
