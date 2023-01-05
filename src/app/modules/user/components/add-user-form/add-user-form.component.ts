import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GmailValidatorDirective } from 'src/app/modules/shared/directives/gmail-validator.directive';
import { UniqueEmailValidatorDirective } from 'src/app/modules/shared/directives/unique-email-validator.directive';

@Component({
  selector: 'app-add-user-form',
  templateUrl: './add-user-form.component.html',
  styleUrls: ['./add-user-form.component.scss'],
})
export class AddUserFormComponent implements OnInit {
  @Output() formReady = new EventEmitter<FormGroup>();
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
    this.formReady.emit(this.userFormGroup);
  }
  
  setImageUrl(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;

    if (files && files[0]) {
      const type = files[0].type;
      const reader = new FileReader();

      if (!type.match('image/')) {
        this.imageName = 'Only images allowed';
        return;
      }

      this.imageName = files[0].name;
        
      reader.onload = (event: ProgressEvent) => {
        this.userFormGroup.get('imageUrl')?.setValue((<FileReader>event.target).result as string);
      }
  
      reader.readAsDataURL(files[0]);
    }
  }

  getControl(controlName: string): FormControl {
    return <FormControl>this.userFormGroup.get(controlName);
  }
}
