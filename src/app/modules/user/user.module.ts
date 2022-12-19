import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPageComponent } from './components/user-page/user-page.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    UserPageComponent,
    UserListComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    UserPageComponent,
  ]
})
export class UserModule { }
