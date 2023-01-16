import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Observable, map } from 'rxjs';
import { CanDeactivateComponent } from '../models/can-deactivate';
import { GuardPopupComponent } from '../../shared/components/guard-popup/guard-popup.component';

@Injectable({
  providedIn: 'root'
})
export class DataChangesGuard implements CanDeactivate<CanDeactivateComponent> {
  constructor(private modalService: MatDialog) {};

  canDeactivate(
    component: CanDeactivateComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean> | boolean {

      if (component.canDeactivate()) {
        return true;
      }
    
      const dialogRef = this.modalService.open(GuardPopupComponent, {
        width: '450px',
        height: '200px', 
      });
    
      return dialogRef.afterClosed().pipe(
        map(result => result === true)
      );    
    }
}
