import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { EditUserPageComponent } from '../../user/pages/edit-user-page/edit-user-page.component';

@Injectable({
  providedIn: 'root'
})
export class DataChangesGuard implements CanDeactivate<EditUserPageComponent> {
  canDeactivate(
    component: EditUserPageComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): boolean {
      return component.canDeactivate();
    }
}
