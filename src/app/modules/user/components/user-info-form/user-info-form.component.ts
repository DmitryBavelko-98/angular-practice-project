import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GmailValidatorDirective } from 'src/app/modules/shared/directives/gmail-validator.directive';
import { UniqueEmailValidatorDirective } from 'src/app/modules/shared/directives/unique-email-validator.directive';

@Component({
  selector: 'app-user-info-form',
  templateUrl: './user-info-form.component.html',
  styleUrls: ['./user-info-form.component.scss'],
})
export class UserInfoFormComponent implements OnInit {
  @Input() set userId(id: string | null) {
    if (id) {
      this.userFormGroup.get('email')!.setAsyncValidators(this.uniqueEmailValidator.validate(id));
    }
  }  
  @Output() formReady = new EventEmitter<FormGroup>();

  imageName!: string;
  emailControl!: FormControl;

  userFormGroup!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private gmailValidator: GmailValidatorDirective,
    private uniqueEmailValidator: UniqueEmailValidatorDirective
  ) {
    this.userFormGroup =this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: [15, [Validators.required, Validators.min(15), Validators.max(100)]],
      email: ['', {
        validators: [Validators.required, Validators.email, this.gmailValidator],
        asyncValidators: [this.uniqueEmailValidator.validate(null)],
        updateOn: 'blur'
      }],
      company: ['', Validators.maxLength(35)],
      department: ['', Validators.minLength(6)],
      gender: [true, Validators.required],
      imageUrl: [''],
    });
  }

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
