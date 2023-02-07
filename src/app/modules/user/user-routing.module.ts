import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataChangesGuard } from '../core/guards/data-changes.guard';
import { UserCompanyInfoComponent } from './components/user-company-info/user-company-info.component';
import { UserContactsInfoComponent } from './components/user-contacts-info/user-contacts-info.component';
import { UserPersonalInfoComponent } from './components/user-personal-info/user-personal-info.component';

import { AddUserPageComponent } from './pages/add-user-page/add-user-page.component';
import { EditUserPageComponent } from './pages/edit-user-page/edit-user-page.component';
import { UserDetailsPageComponent } from './pages/user-details-page/user-details-page.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';

const routes: Routes = [
  {
    path: '', 
    title: 'Users',
    component: UsersPageComponent
  },
  {
    path: 'add', 
    title: 'Add user',
    component: AddUserPageComponent
  },
  {
    path: 'edit/:id', 
    title: 'Edit user',
    component: EditUserPageComponent,
    canDeactivate: [DataChangesGuard]
  },
  {
    path: 'details/:id', 
    title: 'User details',
    component: UserDetailsPageComponent,

    children: [
      {
        path: '', 
        redirectTo: 'personal-info',
        pathMatch: 'full'
      },
      {
        path: 'personal-info', 
        title: 'Personal info',
        component: UserPersonalInfoComponent
      },
      {
        path: 'company-info', 
        title: 'Company info',
        component: UserCompanyInfoComponent
      },
      {
        path: 'contacts', 
        title: 'Contacts',
        component: UserContactsInfoComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}