import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { errorConfig } from '../../models/error-config';

@Component({
  selector: 'app-validation-error',
  templateUrl: './validation-error.component.html',
  styleUrls: ['./validation-error.component.scss']
})
export class ValidationErrorComponent {
  @Input() control!: AbstractControl | null;
  @Input() controlName!: string;

  showValidationMessage(): string {
    let message: string = '';
    const keys = Object.keys(errorConfig);

    for (let key in keys) {
      const error: string = keys[key];

      if (this.control?.hasError(error)) {
        message = errorConfig[error](this.controlName, this.control);
      }
    }

    return message; 
  }
}
