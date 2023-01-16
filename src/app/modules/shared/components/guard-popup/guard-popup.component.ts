import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-guard-popup',
  templateUrl: './guard-popup.component.html',
  styleUrls: ['./guard-popup.component.scss']
})
export class GuardPopupComponent {
  constructor(private dialogRef: MatDialogRef<GuardPopupComponent>) { }

  ok(){
    this.dialogRef.close(true);
  }

  no(){
    this.dialogRef.close(false);
  }
}
