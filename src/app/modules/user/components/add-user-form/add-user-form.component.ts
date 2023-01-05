import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GmailValidatorDirective } from 'src/app/modules/shared/directives/gmail-validator.directive';
import { UniqueEmailValidatorDirective } from 'src/app/modules/shared/directives/unique-email-validator.directive';

@Component({
  selector: 'app-add-user-form',
  templateUrl: './add-user-form.component.html',
  styleUrls: ['./add-user-form.component.scss'],
})
export class AddUserFormComponent implements OnInit {
  @Input() parentForm!: FormGroup;
  imageName!: string;

  constructor(
    private fb: FormBuilder,
    private gmailValidator: GmailValidatorDirective,
    private uniqueEmailValidator: UniqueEmailValidatorDirective
  ) { }

  userFormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    age: ['15', [Validators.required, Validators.min(15), Validators.max(100)]],
    email: ['', {
      validators: [Validators.required, Validators.email, this.gmailValidator],
      asyncValidators: [this.uniqueEmailValidator],
      updateOn: 'blur'
    }],
    company: ['', Validators.maxLength(35)],
    department: ['', Validators.minLength(6)],
    gender: [true, Validators.required],
    imageUrl: [''],
  });

  ngOnInit(): void {
    this.parentForm.addControl('newUser', this.userFormGroup);
  }

  setImageUrl(event: any): void {
    if (event.target.files && event.target.files[0]) {
      this.imageName = event.target.files[0].name;
      
      const reader = new FileReader();
  
      reader.onload = (event: ProgressEvent) => {
        this.userFormGroup.patchValue({imageUrl: (<FileReader>event.target).result as string});
      }
  
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  getControl(controlName: string): FormControl {
    return <FormControl>this.userFormGroup.get(controlName);
  }
}
