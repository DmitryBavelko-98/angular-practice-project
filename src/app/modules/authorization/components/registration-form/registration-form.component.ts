import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/modules/shared/services/authorization.service';
import { matchValues } from 'src/app/modules/shared/services/match-values-validator';
import { uniqueUser } from 'src/app/modules/shared/services/unique-user-validator';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {
  @Output() formReady = new EventEmitter<FormGroup>();

  regGroup!: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private authService: AuthorizationService,
    private router: Router
  ) {
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

    const passwordControl = this.passGroup.get('password') as AbstractControl;
    const confirmationControl = this.passGroup.get('confirmPassword')  as AbstractControl;

    this.passGroup.setValidators(matchValues(passwordControl, confirmationControl));
  }

  ngOnInit(): void {
    this.formReady.emit(this.regGroup);
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

  redirectToLogin(): void {
    this.router.navigate(['login']);
  }
}
