import { AbstractControl } from "@angular/forms";

export type ErrorMessage = {[key: string]: (name: string, control: AbstractControl) => string};
