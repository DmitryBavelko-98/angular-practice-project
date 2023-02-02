import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { AuthorizationService } from '../../services/authorization.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  form!: FormGroup;
  showErrorMessage = false;

  constructor(
    private fb: FormBuilder, 
    private authService: AuthorizationService,
    private router: Router,
  ) {
    this.form = this.fb.group({});
  }

  ngOnInit(): void {}

  addFormControl(form: FormGroup, key: string): void {
    this.form.addControl(key, form);
  }

  checkUser(): void {
    this.form.markAllAsTouched();
    
    if (this.form.valid) {
      const loginForm = this.form.get('loginForm');

      const userCred = {userName: loginForm!.value.userName, password: loginForm!.value.password};

      this.authService.loginUser(userCred)
        .pipe(take(1))
        .subscribe((status) => {
          if (status) {
            this.router.navigate(['home']);
          } else {
            this.showErrorMessage = true;

            setTimeout(() => this.showErrorMessage = false, 3000);
          }
        });
    }
  }
}
