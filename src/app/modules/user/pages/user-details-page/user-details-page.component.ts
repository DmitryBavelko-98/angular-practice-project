import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import IUser from '../../models/user';
import { UserApiService } from '../../services/user-api.service';

@Component({
  selector: 'app-user-details-page',
  templateUrl: './user-details-page.component.html',
  styleUrls: ['./user-details-page.component.scss']
})
export class UserDetailsPageComponent implements OnInit {
  id!: string;
  user!: IUser;

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private userApi: UserApiService,
  ) {}

  ngOnInit(): void {
    this.activateRoute.params
      .pipe(take(1))
      .subscribe(params => {
        this.id = params['id'];

        this.loadUser();
      });
  }

  loadUser(): void {
    this.userApi.getUserById(this.id)
    .pipe(take(1))
    .subscribe(user => {
      this.user = user;
      this.navigateToPersonalInfo();
    });
  }

  navigateToCompanyInfo(): void {
    const {company, department} = this.user;

    this.router.navigate(
      [`user/details/${this.user.id}/company-info`], 
      { queryParams: { company, department } }
    );
  }

  navigateToPersonalInfo(): void {
    const {firstName, lastName, age, id, gender} = this.user;

    this.router.navigate(
      [`user/details/${this.user.id}/personal-info`], 
      { queryParams: { firstName, lastName, age, id, gender } }
    );
  }

  navigateToContacts(): void {
    const {email, addresses} = this.user;

    this.router.navigate(
      [`user/details/${this.user.id}/contacts`], 
      { queryParams: { email, addresses: JSON.stringify(addresses) } }
    );
  }
}
