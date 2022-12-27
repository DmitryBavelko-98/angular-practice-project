import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmailValidatorDirective } from 'src/app/modules/shared/directives/email-validator.directive';
import { UniqueEmailValidatorDirective } from 'src/app/modules/shared/directives/unique-email-validator.directive';

@Component({
  selector: 'app-add-user-form',
  templateUrl: './add-user-form.component.html',
  styleUrls: ['./add-user-form.component.scss'],
  providers: [EmailValidatorDirective, UniqueEmailValidatorDirective]
})
export class AddUserFormComponent implements OnInit {
  @Input() parentForm!: FormGroup

  constructor(
    private fb: FormBuilder,
    private emailValidator: EmailValidatorDirective,
    private uniqueEmailValidator: UniqueEmailValidatorDirective
  ) { }

  userFormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    age: ['15', [Validators.required, Validators.min(15), Validators.max(100)]],
    email: ['', [Validators.required, Validators.email, this.emailValidator], [this.uniqueEmailValidator]],
    company: ['', Validators.maxLength(35)],
    department: ['', Validators.minLength(6)],
    gender: [true, Validators.required]
  });

  ngOnInit(): void {
    this.parentForm.addControl('newUser', this.userFormGroup);
  }

  getControl(controlName: string): FormControl {
    return <FormControl>this.userFormGroup.get(controlName);
  }
}
