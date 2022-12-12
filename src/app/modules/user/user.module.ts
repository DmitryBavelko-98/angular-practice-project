import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPageComponent } from './components/userPage/user-page.component';
import { MaterialModule } from '../material/material.module';
import { UsersListComponent } from './components/usersList/users-list.component';


@NgModule({
  declarations: [
    UserPageComponent,
    UsersListComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    UserPageComponent,
  ]
})
export class UserModule { }
