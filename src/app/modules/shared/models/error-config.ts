import { AbstractControl } from "@angular/forms";
import { ErrorMessage } from "./error-message";

export const errorConfig: ErrorMessage = {
    required: (name: string, control: AbstractControl): string => `${name} must not be empty`,
    min: (name: string, control: AbstractControl): string => `${name} should be ${control.errors!['min'].min} or more`,
    max: (name: string, control: AbstractControl): string => `${name} should be ${control.errors!['min'].min} or less`,
    minlength: (name: string, control: AbstractControl): string => `${name} must contain at least ${control.errors!['minlength'].requiredLength} characters`,
    maxlength: (name: string, control: AbstractControl): string => `${name} must contain no more then ${control.errors!['maxlength'].requiredLength} characters`,
    email: (name: string, control: AbstractControl): string => `Wrong format of ${name}`,
    gmail: (name: string, control: AbstractControl): string => `${name} should end with @gmail.com`,
    emailExists: (name: string, control: AbstractControl): string => `User with this email already exists`,
};