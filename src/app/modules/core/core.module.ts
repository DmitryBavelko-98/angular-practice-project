import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../../app-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { ConfirmPopupComponent } from './components/confirm-popup/confirm-popup.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    HeaderComponent,
    ConfirmPopupComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatDialogModule,
  ],
  exports: [
    MatDialogModule,
    AppRoutingModule,
    HeaderComponent,
    ConfirmPopupComponent,
  ]
})
export class CoreModule { }
