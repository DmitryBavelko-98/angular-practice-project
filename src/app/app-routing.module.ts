import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './modules/core/pages/home-page/home-page.component';
import { RegistrationPageComponent } from './modules/authorization/pages/registration-page/registration-page.component';
import { LoginPageComponent } from './modules/authorization/pages/login-page/login-page.component';
import { AuthGuard } from './modules/core/guards/auth.guard';

const routes: Routes = [
  {path: '', canActivate:[AuthGuard], children: [
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {path: 'home', component: HomePageComponent},
      {
        path: 'car', 
        loadChildren: () => import('./modules/car/car.module').then(m => m.CarModule)
      },
      {
        path: 'user',
        loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule)
      },
    ],
  },
  {path: 'reg', component: RegistrationPageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: "**", redirectTo:"home", pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
