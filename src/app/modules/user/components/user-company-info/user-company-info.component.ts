import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';

@Component({
  selector: 'app-user-company-info',
  templateUrl: './user-company-info.component.html',
  styleUrls: ['./user-company-info.component.scss']
})
export class UserCompanyInfoComponent implements OnInit {
  userData!: any;

  constructor(private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activateRoute.queryParams
      .pipe(take(1))
      .subscribe(params => this.userData = params);
  }

}
