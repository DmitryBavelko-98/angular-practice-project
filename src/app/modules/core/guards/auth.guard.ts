import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, NavigationEnd, Router, RouterStateSnapshot, Event } from '@angular/router';
import { filter, Observable, takeUntil } from 'rxjs';
import { AuthorizationService } from '../../authorization/services/authorization.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthorizationService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
      if (this.authService.user$.value) {
        return true;
      } 

      this.router.navigate(['/login']);
      return false;
  }
  
}
