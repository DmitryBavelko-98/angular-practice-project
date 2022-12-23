import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarPageComponent } from './modules/car/pages/car-page/car-page.component';
import { AddUserPageComponent } from './modules/user/pages/add-user-page/add-user-page.component';
import { UserPageComponent } from './modules/user/pages/user-page/user-page.component';

const routes: Routes = [
  {path: '', redirectTo:'/users', pathMatch: 'full'},
  {path: 'users', component: UserPageComponent},
  {path: 'cars', component: CarPageComponent},
  {path: 'add-user', component: AddUserPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
