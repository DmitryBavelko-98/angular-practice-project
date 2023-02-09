import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthorizationService } from 'src/app/modules/shared/services/authorization.service';

@Component({
  selector: 'app-authed-header',
  templateUrl: './authed-header.component.html',
  styleUrls: ['./authed-header.component.scss']
})
export class AuthedHeaderComponent implements OnInit {
  userName: string = '';
  destroy$ = new Subject<void>();

  constructor(private authService: AuthorizationService, private router: Router) {}

  ngOnInit(): void {
    this.authService.getCurrentUser()
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => this.userName = JSON.parse(user).userName);
  }

  a(elem: any) {
    elem.classList.add('active');
  }

  logoutUser(): void {
    this.authService.logoutUser()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.router.navigate(['login']));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

}
