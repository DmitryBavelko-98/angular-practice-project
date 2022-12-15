import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPageComponent } from './components/userPage/user-page.component';
import { MaterialModule } from '../material/material.module';
import { UsersListComponent } from './components/usersList/users-list.component';
import { UserItemComponent } from './components/user-item/user-item.component';


@NgModule({
  declarations: [
    UserPageComponent,
    UsersListComponent,
    UserItemComponent,
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
