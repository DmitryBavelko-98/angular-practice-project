import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './modules/core/pages/home-page/home-page.component';
import { RegistrationPageComponent } from './modules/authorization/pages/registration-page/registration-page.component';
import { LoginPageComponent } from './modules/authorization/pages/login-page/login-page.component';
import { AuthGuard } from './modules/core/guards/auth.guard';
import { AuthedUserWrapperComponent } from './modules/core/components/authed-user-wrapper/authed-user-wrapper.component';
import { NonAuthedUserWrapperComponent } from './modules/core/components/non-authed-user-wrapper/non-authed-user-wrapper.component';
import { AuthExitGuard } from './modules/core/guards/auth-exit.guard';
import { LoadModulesGuard } from './modules/core/guards/load-modules.guard';

const routes: Routes = [
  {
    path: '', 
    component: AuthedUserWrapperComponent,
    canActivate:[AuthGuard], 
    
    children: [
      {
        path: '', 
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home', 
        title: 'Home',
        component: HomePageComponent
      },
      {
        path: 'car', 
        canLoad: [LoadModulesGuard],
        loadChildren: () => import('./modules/car/car.module').then(m => m.CarModule)
      },
      {
        path: 'user',
        canLoad: [LoadModulesGuard],
        loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule)
      },
    ],
  },

  {
    path: '',
    component: NonAuthedUserWrapperComponent,
    canActivate:[AuthExitGuard], 

    children: [
      {
        path: '**', 
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login', 
        title: 'Login',
        component: LoginPageComponent
      },
      {
        path: 'reg', 
        title: 'Registration',
        component: RegistrationPageComponent
      },
    ]
  },

  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
