import { ErrorMessage } from "../models/error-message";

export const errorConfig: ErrorMessage = {
    required: (name): string => `${name} must not be empty`,
    min: (name, control): string => `${name} should be ${control.errors!['min'].min} or more`,
    max: (name, control): string => `${name} should be ${control.errors!['min'].min} or less`,
    minlength: (name, control): string => `${name} must contain at least ${control.errors!['minlength'].requiredLength} characters`,
    maxlength: (name, control): string => `${name} must contain no more then ${control.errors!['maxlength'].requiredLength} characters`,
    email: (name): string => `Wrong format of ${name}`,
    gmail: (name): string => `${name} should end with @gmail.com`,
    emailExists: (): string => `User with this email already exists`,
    userExists: (): string => `User with this name already exists`,
    valuesDontMatch: (name): string => `${name} doesn't matches!`,
};