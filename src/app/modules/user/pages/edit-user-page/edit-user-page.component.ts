import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { FormGroup } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import IUser from '../../models/user';

@Component({
  selector: 'app-edit-user-page',
  templateUrl: './edit-user-page.component.html',
  styleUrls: ['./edit-user-page.component.scss']
})
export class EditUserPageComponent implements OnInit {
  id!: number;
  form!: FormGroup;
  user!: IUser;
  isFormTouched: boolean = false;
  isPopupOpened: boolean = false;
  isPageCanBeClosed: boolean = false;

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private userService: UserService,
  ) {
    activateRoute.params.subscribe(params => {
      this.id = params['id'];
    })
  }

  ngOnInit(): void {
    this.user = this.userService.getUserById(+this.id);
  }

  togglePopup(): void {
    this.isPopupOpened = !this.isPopupOpened;
  }

  getPopupResponse(res: boolean) {
    this.isPageCanBeClosed = res;
  }

  canDeactivate(): boolean {

    if (this.isFormTouched && !this.form) {
      return confirm('Unsaved data detected. Want to exit?');
    } else {
      return true;
    }

  }

  receiveFormStatus(): void {
    this.isFormTouched = true;
  }

  receiveForm(form: FormGroup): void {
    this.form = form;

    this.sendUserData();
  }

  sendUserData(): void {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      const userData = {...this.form.value.user, ...this.form.value.addresses};

      this.userService.updateUser({id: this.user.id, ...userData});

      this.router.navigate(['users']);
    }
  }
}
