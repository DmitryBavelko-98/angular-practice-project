import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../../app-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { ConfirmPopupComponent } from './components/confirm-popup/confirm-popup.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    HeaderComponent,
    ConfirmPopupComponent,
    HomePageComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule,
    MatDialogModule,
    HttpClientModule,
  ],
  exports: [
    MatDialogModule,
    HttpClientModule,
    HeaderComponent,
    ConfirmPopupComponent,
  ]
})
export class CoreModule { }
