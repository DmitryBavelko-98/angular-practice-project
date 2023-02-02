import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorizationService } from '../../shared/services/authorization.service';

@Injectable({
  providedIn: 'root'
})
export class AuthExitGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthorizationService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
      if (this.authService.isAuthorized) {
        this.router.navigate(['/home']);
        return false;
      } 

      return true;
  }
  
}
