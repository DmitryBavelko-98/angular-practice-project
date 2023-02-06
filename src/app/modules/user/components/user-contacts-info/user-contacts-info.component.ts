import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';

@Component({
  selector: 'app-user-contacts-info',
  templateUrl: './user-contacts-info.component.html',
  styleUrls: ['./user-contacts-info.component.scss']
})
export class UserContactsInfoComponent implements OnInit {
  userData!: any;

  constructor(private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activateRoute.queryParams
      .pipe(take(1))
      .subscribe(params => {
        this.userData = {email: params['email'], addresses: JSON.parse(params['addresses'])};
      });
  }
}
