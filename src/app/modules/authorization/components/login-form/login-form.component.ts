import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  @Output() formReady = new EventEmitter<FormGroup>();

  loginGroup!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginGroup = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.formReady.emit(this.loginGroup);
  }

  getControl(controlName: string): FormControl {
    return <FormControl>this.loginGroup.get(controlName);
  }

  redirectToSignUp(): void {
    this.router.navigate(['reg']);
  }
}
