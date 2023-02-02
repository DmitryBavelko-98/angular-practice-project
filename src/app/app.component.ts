import { Component, OnDestroy } from '@angular/core';
import { NavigationEnd, Router, Event } from '@angular/router';
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

  constructor(private logger: LoggerService, private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd), 
      takeUntil(this.destroy$)
    )
    .subscribe((e: Event) => this.logger.log(`You're on ${(e as NavigationEnd).url.slice(1)} page`));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
