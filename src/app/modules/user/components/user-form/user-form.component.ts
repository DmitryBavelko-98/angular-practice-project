import { 
  Component, 
  EventEmitter, 
  OnInit, 
  Output, 
  Input, 
  ViewChild, 
  AfterViewInit,
} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AddressesListComponent } from 'src/app/modules/shared/components/addresses-list/addresses-list.component';
import IUser from '../../models/user';
import { UserInfoFormComponent } from '../user-info-form/user-info-form.component';
import { Observable, merge } from 'rxjs';
import { UniqueEmailValidatorDirective } from 'src/app/modules/shared/directives/unique-email-validator.directive';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit, AfterViewInit {
  form!: FormGroup;

  @Input() user!: IUser;
  @Output() formReady = new EventEmitter<FormGroup>();
  @Output() formTouched = new EventEmitter<boolean>();

  @ViewChild(UserInfoFormComponent) userInfoForm!: UserInfoFormComponent;
  @ViewChild(AddressesListComponent) userAddressesForm!: AddressesListComponent;

  constructor(private fb: FormBuilder, private uniqueEmailValidator: UniqueEmailValidatorDirective) { }

  ngOnInit(): void {
    this.form = this.fb.group({});
  }

  ngAfterViewInit(): void {
    if (this.user) {
      setTimeout(() => this.patchDataToForm());
    }
  }

  patchDataToForm(): void {
    const addressesForm = this.userAddressesForm.addresses;
    const {firstName, lastName, age, email, company, department, gender, imageUrl} = this.user;
    const addresses = this.user.addresses;

    for (let i = 0; i < addresses.length - 1; i++) {
      this.userAddressesForm.addAddress();
    }

    this.toggleEmailValidation(email);
    this.generateEmailValue();

    addressesForm.patchValue(addresses);
    this.userInfoForm.userFormGroup.patchValue({firstName, lastName, age, email, company, department, gender, imageUrl});
  }

  private generateEmailValue () {
    const firstName = this.form.controls['user'].get('firstName');
    const lastName = this.form.controls['user'].get('lastName');
    const email = this.form.controls['user'].get('email')

    merge(
      firstName?.valueChanges as Observable<string>,
      lastName?.valueChanges as Observable<string>
    ).subscribe(() => {
      email?.setValue(`${firstName?.value}${lastName?.value}` + '@gmail.com');
    });
  }

  private toggleEmailValidation(email: string): void {
    const userForm = this.userInfoForm.userFormGroup;

    userForm.get('email')?.valueChanges
    .subscribe(value => {
      if (value === email) {
        userForm.get('email')?.clearAsyncValidators();
        userForm.get('email')?.updateValueAndValidity({emitEvent: false});
      }
      
      userForm.get('email')?.addAsyncValidators(this.uniqueEmailValidator.validate);
    });
  }

  sendFormToPage(): void {
    this.formReady.emit(this.form);
  }

  sendFormStatus(): void {
    this.formTouched.emit(true);
  }

  addFormControl(event: FormGroup, key: string): void {
    this.form.addControl(key, event);
  }
}
