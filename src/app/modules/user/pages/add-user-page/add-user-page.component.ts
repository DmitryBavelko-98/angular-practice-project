import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { take } from 'rxjs';

@Component({
  selector: 'app-add-user-page',
  templateUrl: './add-user-page.component.html',
  styleUrls: ['./add-user-page.component.scss']
})
export class AddUserPageComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({});
  }

  ngOnInit(): void {}

  sendForm(form: FormGroup) {
    this.form = form;
    this.sendUserData();
  }

  sendUserData(): void {
    this.form.markAllAsTouched();
    
    if (this.form.valid) {
      const userData = {...this.form.value.user, ...this.form.value.addresses};

      this.userService.addNewUser(userData)
        .pipe(take(1))
        .subscribe(() => this.router.navigate(['users']));
    }
  }

  addFormControl(event: FormGroup, key: string): void {
    this.form.addControl(key, event);
  }
}

