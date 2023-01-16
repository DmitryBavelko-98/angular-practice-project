import { 
  Component, 
  OnInit, 
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import IUser from '../../models/user';
import { Observable, merge, Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-user-page',
  templateUrl: './edit-user-page.component.html',
  styleUrls: ['./edit-user-page.component.scss']
})
export class EditUserPageComponent implements OnInit, AfterViewInit, OnDestroy {
  isFormSaved: boolean = false;
  id!: number;
  form!: FormGroup;
  user!: IUser;
  subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({});
  }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      this.id = +params['id'];
    })
    const idSubscription = this.userService.getUserById(this.id)
      .subscribe(user => this.user = user);

    this.subscriptions.push(idSubscription);
  }

  ngAfterViewInit(): void {
    if (this.user) {
      setTimeout(() => this.patchDataToForm());
    }
  }

  checkPopup(permission: boolean): void {
    this.isFormSaved = true;
  }
 
  canDeactivate(): boolean {
    return !this.form.dirty || this.isFormSaved; 
  }

  sendUserData(): void {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      const userData = {...this.form.value.user, ...this.form.value.addresses};
      this.userService.updateUser({id: this.user.id, ...userData});

      this.isFormSaved = true;

      this.router.navigate(['users']);
    }
  }

  private patchDataToForm(): void {
    const userInfoForm = this.form.controls['user'];
    const addressesForm = this.form.controls['addresses'];
    const {firstName, lastName, age, email, company, department, gender, imageUrl} = this.user;

    this.generateEmailValue();

    addressesForm.get('addresses')!.patchValue(this.user.addresses);
    userInfoForm.patchValue({firstName, lastName, age, email, company, department, gender, imageUrl});
  }

  private generateEmailValue(): void {
    const firstName = this.form.controls['user'].get('firstName');
    const lastName = this.form.controls['user'].get('lastName');
    const email = this.form.controls['user'].get('email')

    const emailSubscription = merge(
      firstName?.valueChanges as Observable<string>,
      lastName?.valueChanges as Observable<string>
    ).subscribe(() => {
      email?.setValue(`${firstName?.value}${lastName?.value}` + '@gmail.com');
    });

    this.subscriptions.push(emailSubscription);
  }

  addFormControl(event: FormGroup, key: string): void {
    this.form.addControl(key, event);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
