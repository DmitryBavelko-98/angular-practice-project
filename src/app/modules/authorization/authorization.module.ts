import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { LoginFormComponent } from './components/login-form/login-form.component';

@NgModule({
  declarations: [
    RegistrationPageComponent,
    LoginPageComponent,
    RegistrationFormComponent,
    LoginFormComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
  ]
})
export class AuthorizationModule { }

