import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthorizationService } from '../../services/authorization.service';
import { matchPasswords } from '../../services/match-password-validator';
import { uniqueUser } from '../../services/unique-user-validator';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {
  @Output() formReady = new EventEmitter<FormGroup>();

  regGroup!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthorizationService) {
    this.regGroup = this.fb.group({
      userName: ['', {
        validators: [Validators.required],
        asyncValidators: [uniqueUser(this.authService)],
        updateOn: 'blur'
      }],
      passGroup: this.fb.group({
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required]
      }, { updateOn: 'blur' })
    });

    this.passGroup.setValidators(matchPasswords());
  }

  ngOnInit(): void {
    this.formReady.emit(this.regGroup);
  }

  checkPassGroupValidity(): boolean {
    if (this.passGroup.hasError('passwordsDontMatch') 
    && this.getPassControl('confirmPassword').dirty 
    && this.getPassControl('password').dirty) {
      return true;
    } 

    return false;
  }
  
  getRegControl(controlName: string): FormControl {
    return <FormControl>this.regGroup.get(controlName);
  }

  getPassControl(controlName: string): FormControl {
    return <FormControl>this.regGroup.get('passGroup')!.get(controlName);
  }

  get passGroup() {
    return this.regGroup.get('passGroup') as FormGroup;
  }
}
