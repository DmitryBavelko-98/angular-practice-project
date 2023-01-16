import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { SharedModule } from '../shared/shared.module';
import { AddUserPageComponent } from './pages/add-user-page/add-user-page.component';
import { MatRadioModule } from '@angular/material/radio';
import { UserInfoFormComponent } from './components/user-info-form/user-info-form.component';
import { UserListItemComponent } from './components/user-list-item/user-list-item.component';
import { EditUserPageComponent } from './pages/edit-user-page/edit-user-page.component';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [
    UserPageComponent,
    UserListComponent,
    AddUserPageComponent,
    UserInfoFormComponent,
    UserListItemComponent,
    EditUserPageComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatRadioModule,
    CoreModule
  ],
  exports: [
    UserPageComponent,
  ]
})
export class UserModule { }

