import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmPopupComponent } from '../components/confirm-popup/confirm-popup.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private modalService: MatDialog) {};

  warn(): MatDialogRef<ConfirmPopupComponent> {
    return this.modalService.open(ConfirmPopupComponent, {
      width: '500px',
      height: '250px', 
    });
  }

}
