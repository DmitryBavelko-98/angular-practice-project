import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorizationService } from '../../shared/services/authorization.service';

@Injectable({
  providedIn: 'root'
})
export class LoadModulesGuard implements CanLoad {
  constructor(
    private router: Router,
    private authService: AuthorizationService
  ) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | boolean {
      if (this.authService.isAuthorized) {
        return true;
      } 

      this.router.navigate(['/login']);
      return false;
  }
}
