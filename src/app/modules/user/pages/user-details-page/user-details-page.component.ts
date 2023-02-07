import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take, mergeMap } from 'rxjs';
import IUser from '../../models/user';
import { UserDetailsPageService } from '../../services/user-details-page-service.service';

@Component({
  selector: 'app-user-details-page',
  templateUrl: './user-details-page.component.html',
  styleUrls: ['./user-details-page.component.scss']
})
export class UserDetailsPageComponent implements OnInit {
  user!: IUser | null;

  // navLinks = [
  //   {link: 'personal-info', label: 'Personal info'},
  //   {link: 'company-info', label: 'Company info'},
  //   {link: 'contacts', label: 'Contacts'},
  // ];

  constructor(private activateRoute: ActivatedRoute, private userDetails: UserDetailsPageService) {}

  ngOnInit(): void {
    this.activateRoute.params
      .pipe(
        mergeMap(params => {
          return this.userDetails.setCurrentUser(params['id'])
        }),
        take(1)
      )
      .subscribe(user => this.user = user);
  }

  
  get routes() {
    if (this.activateRoute.routeConfig) {
      return this.activateRoute.routeConfig.children?.slice(1);
    }

    return [];
  }
}
