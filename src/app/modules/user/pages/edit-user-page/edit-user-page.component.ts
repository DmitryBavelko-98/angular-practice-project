import { 
  Component, 
  OnInit, 
  OnDestroy
} from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import IUser from '../../models/user';
import { Observable, merge, Subscription, take } from 'rxjs';

@Component({
  selector: 'app-edit-user-page',
  templateUrl: './edit-user-page.component.html',
  styleUrls: ['./edit-user-page.component.scss']
})
export class EditUserPageComponent implements OnInit, OnDestroy {
  isFormSaved: boolean = false;
  id!: number;
  form!: FormGroup;
  user!: IUser;
  emailSubscription!: Subscription;

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private userService: UserService,
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
        this.id = +params['id'];

        this.loadUser();
      });
  }

  ngOnDestroy(): void {
    this.emailSubscription.unsubscribe();
  }

  loadUser(): void {
    this.userService.getUserById(this.id)
    .pipe(take(1))
    .subscribe(user => {
      this.user = user;

      for (let address of this.user.addresses) {
        this.addresses.push(this.fb.group({}));
      }

      setTimeout(() => {
        this.addresses.patchValue(this.user.addresses);
      });

      this.patchDataToForm();
      this.generateEmailValue();
    });
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
    const {firstName, lastName, age, email, company, department, imageUrl , gender} = this.user;

    this.addresses!.patchValue(this.user.addresses);
    userInfoForm.patchValue({firstName, lastName, age, email, company, department, imageUrl , gender});
  }

  private generateEmailValue(): void {
    const firstName = this.form.controls['user'].get('firstName');
    const lastName = this.form.controls['user'].get('lastName');
    const email = this.form.controls['user'].get('email')

    this.emailSubscription = merge(
      firstName?.valueChanges as Observable<string>,
      lastName?.valueChanges as Observable<string>
    ).subscribe(() => {
      email?.setValue(`${firstName?.value}${lastName?.value}` + '@gmail.com');
    });
  }

  addFormControl(event: FormGroup, key: string): void {
    this.form.addControl(key, event);
  }

  get addresses(): FormArray {
    return this.form.get('addressesForm.addresses') as FormArray;
  }
}
