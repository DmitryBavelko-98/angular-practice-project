import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarPageComponent } from './modules/car/components/carPage/car-page.component';
import { UserPageComponent } from './modules/user/components/userPage/user-page.component';

const routes: Routes = [
  {path: '', redirectTo:'/users', pathMatch: 'full'},
  {path: 'users', component: UserPageComponent},
  {path: 'cars', component: CarPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
