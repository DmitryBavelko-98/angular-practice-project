import { Component, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, Subject, takeUntil } from 'rxjs';
import { LoggerService } from './modules/core/services/logger.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'angular-practice-project';
  destroy$ = new Subject<void>();

  constructor(
    private logger: LoggerService, 
    private router: Router,
    private titleService: Title
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd), 
      takeUntil(this.destroy$)
    )
    .subscribe(() => setTimeout(() => this.logger.log(`You're on ${this.titleService.getTitle()} page`)));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
