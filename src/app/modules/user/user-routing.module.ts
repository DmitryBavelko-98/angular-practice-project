import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataChangesGuard } from '../core/guards/data-changes.guard';

import { AddUserPageComponent } from './pages/add-user-page/add-user-page.component';
import { EditUserPageComponent } from './pages/edit-user-page/edit-user-page.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';

const routes: Routes = [
  {path: '', component: UsersPageComponent},
  {path: 'add', component: AddUserPageComponent},
  {
    path: 'edit/:id', 
    component: EditUserPageComponent,
    canDeactivate: [DataChangesGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}