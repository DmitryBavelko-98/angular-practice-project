import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CanComponentDeactivate } from '../models/can-deactivate';
import { DialogService } from '../services/dialog.service';

@Injectable({
  providedIn: 'root'
})
export class DataChangesGuard implements CanDeactivate<CanComponentDeactivate> {
  constructor(private dialogService: DialogService) {};

  canDeactivate(
    component: CanComponentDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean> | boolean {

      return component.canDeactivate() 
      ? true 
      : this.dialogService.warn().afterClosed();
    }
}
