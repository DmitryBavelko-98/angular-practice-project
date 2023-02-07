import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import IUser from '../../models/user';
import { UserDetailsPageService } from '../../services/user-details-page-service.service';

@Component({
  selector: 'app-user-company-info',
  templateUrl: './user-company-info.component.html',
  styleUrls: ['./user-company-info.component.scss']
})
export class UserCompanyInfoComponent implements OnInit {
  userData!: IUser | null;

  constructor(private userDetails: UserDetailsPageService) { }

  ngOnInit(): void {
    this.userDetails.getCurrentUser()
      .pipe(take(1))
      .subscribe(user => this.userData = user);
  }   

}
