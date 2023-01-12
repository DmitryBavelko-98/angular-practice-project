import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarPageComponent } from './modules/car/pages/car-page/car-page.component';
import { DataChangesGuard } from './modules/core/guards/data-changes.guard';
import { AddUserPageComponent } from './modules/user/pages/add-user-page/add-user-page.component';
import { EditUserPageComponent } from './modules/user/pages/edit-user-page/edit-user-page.component';
import { UserPageComponent } from './modules/user/pages/user-page/user-page.component';

const routes: Routes = [
  {path: '', redirectTo:'/users', pathMatch: 'full'},
  {path: 'cars', component: CarPageComponent},
  {path: 'add-user', component: AddUserPageComponent},
  {path: 'users', component: UserPageComponent},
  {
    path: 'users/edit-user/:id', component: EditUserPageComponent,
    canDeactivate: [DataChangesGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
