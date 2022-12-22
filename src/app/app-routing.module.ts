import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarPageComponent } from './modules/car/components/carPage/car-page.component';
import { AddUserPageComponent } from './modules/user/components/add-user-page/add-user-page.component';
import { UserPageComponent } from './modules/user/components/user-page/user-page.component';

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
