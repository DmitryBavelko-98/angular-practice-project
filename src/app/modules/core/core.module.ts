import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../../app-routing.module';
import { ConfirmPopupComponent } from './components/confirm-popup/confirm-popup.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SharedModule } from '../shared/shared.module';
import { AuthedUserWrapperComponent } from './components/authed-user-wrapper/authed-user-wrapper.component';
import { NonAuthedUserWrapperComponent } from './components/non-authed-user-wrapper/non-authed-user-wrapper.component';
import { NonAuthedHeaderComponent } from './components/non-authed-header/non-authed-header.component';
import { AuthedHeaderComponent } from './components/authed-header/authed-header.component';

@NgModule({
  declarations: [
    ConfirmPopupComponent,
    HomePageComponent,
    AuthedUserWrapperComponent,
    NonAuthedUserWrapperComponent,
    NonAuthedHeaderComponent,
    AuthedHeaderComponent,
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
    ConfirmPopupComponent,
    AuthedUserWrapperComponent,
    NonAuthedUserWrapperComponent,
  ]
})
export class CoreModule { }
