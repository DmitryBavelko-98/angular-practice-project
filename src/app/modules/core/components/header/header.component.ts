import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router, Event } from '@angular/router';
import { BehaviorSubject, filter, Subject, takeUntil } from 'rxjs';
import { AuthorizationService } from 'src/app/modules/authorization/services/authorization.service';
import { LoggerService } from '../../services/logger.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  user$ = new BehaviorSubject<string>('');
  destroy$ = new Subject<void>();

  constructor(
    private authService: AuthorizationService, 
    private router: Router,
    private logger: LoggerService
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd), 
      takeUntil(this.destroy$)
    )
    .subscribe((e: Event) => {
      const url = (e as NavigationEnd).url

      if (url === '/login' || url === '/reg') {
        this.logoutUser();
      }

      this.logger.log(`You're on ${url.slice(1)} page`);
    });
  }

  ngOnInit(): void {
    this.authService.getCurrentUser()
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => this.user$.next(user));
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
