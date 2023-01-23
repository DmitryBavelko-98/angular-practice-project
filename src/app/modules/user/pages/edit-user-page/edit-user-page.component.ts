import { 
  Component, 
  OnInit, 
} from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import IUser from '../../models/user';
import { Observable, merge, Subscription, take, takeWhile } from 'rxjs';
import { UserApiService } from '../../services/user-api.service';

@Component({
  selector: 'app-edit-user-page',
  templateUrl: './edit-user-page.component.html',
  styleUrls: ['./edit-user-page.component.scss']
})
export class EditUserPageComponent implements OnInit {
  isFormSaved: boolean = false;
  id!: string;
  form!: FormGroup;
  user!: IUser;
  emailSubscription!: Subscription;
  componentExists: boolean = true;

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private userApi: UserApiService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      addressesForm: this.fb.group({
          addresses: this.fb.array([]),
      }),
    });
  }

  ngOnInit(): void {
    this.activateRoute.params
      .pipe(take(1))
      .subscribe(params => {
        this.id = params['id'];

        this.loadUser();
      });
  }

  get addresses(): FormArray {
    return this.form.get('addressesForm.addresses') as FormArray;
  }

  loadUser(): void {
    this.userApi.getUserById(this.id)
    .pipe(take(1))
    .subscribe(user => {
      this.user = user;

      for (let address of this.user.addresses) {
        this.addresses.push(this.fb.group({}));
      }

      setTimeout(() => {
        this.patchDataToForm();
        this.generateEmailValue();
      });
    });
  }

  canDeactivate(): boolean {
    return !this.form.dirty || this.isFormSaved; 
  }

  sendUserData(): void {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      const userData = {...this.form.value.user, ...this.form.value.addresses};
      this.userApi.editUser({id: this.user.id, ...userData})
        .pipe(take(1))
        .subscribe();

      this.isFormSaved = true;

      this.router.navigate(['users']);
    }
  }

  private patchDataToForm(): void {
    this.form.controls['user'].patchValue(this.user);
    this.addresses.patchValue(this.user.addresses);
  }

  private generateEmailValue(): void {
    const firstName = this.form.controls['user'].get('firstName');
    const lastName = this.form.controls['user'].get('lastName');
    const email = this.form.controls['user'].get('email')

    this.emailSubscription = merge(
      firstName?.valueChanges as Observable<string>,
      lastName?.valueChanges as Observable<string>
    )
    .pipe((takeWhile(() => this.componentExists)))
    .subscribe(() => {
      email?.setValue(`${firstName?.value}${lastName?.value}` + '@gmail.com');
    });
  }

  addFormControl(event: FormGroup, key: string): void {
    this.form.addControl(key, event);
  }
}
