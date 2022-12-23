import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { SharedModule } from '../shared/shared.module';
import { AddUserPageComponent } from './pages/add-user-page/add-user-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { AddUserFormComponent } from './components/add-user-form/add-user-form.component';
import { UserListItemComponent } from './components/user-list-item/user-list-item.component';

@NgModule({
  declarations: [
    UserPageComponent,
    UserListComponent,
    AddUserPageComponent,
    AddUserFormComponent,
    UserListItemComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    MatRadioModule,
  ],
  exports: [
    UserPageComponent,
  ]
})
export class UserModule { }

// refactor add-user-form - done
// IUserForm и расширять в IUser - done 
// ставить типы void - done
// переименовать list-item в card - done
// Default image
// add pages - done
