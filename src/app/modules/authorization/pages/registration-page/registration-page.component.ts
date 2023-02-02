import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { take } from 'rxjs';
import { AuthorizationService } from 'src/app/modules/shared/services/authorization.service';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit {
  form!: FormGroup;
  showSuccessMessage = false;

  constructor(
    private fb: FormBuilder, 
    protected authService: AuthorizationService,
  ) {
    this.form = this.fb.group({});
  }

  ngOnInit(): void {}

  addFormControl(form: FormGroup, key: string): void {
    this.form.addControl(key, form);
  }

  sendData(): void {
    this.form.markAllAsTouched();
    
    if (this.form.valid) {
      const regForm = this.form.get('regForm');

      const userCred = {userName: regForm!.value.userName, password: regForm!.get('passGroup')!.value.password};

      this.authService.registerUser(userCred)
        .pipe(take(1))
        .subscribe((status) => {
          this.form.reset();
          this.showSuccessMessage = true;
          setTimeout(() => this.showSuccessMessage = false, 3000);
        });
    }
  }

}
