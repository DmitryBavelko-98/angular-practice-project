import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FavoritesListComponent } from './components/favorites-list/favorites-list.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { GmailValidatorDirective } from './directives/gmail-validator.directive';
import { ValidationErrorComponent } from './components/validation-error/validation-error.component';
import { UniqueEmailValidatorDirective } from './directives/unique-email-validator.directive';


@NgModule({
  declarations: [
    CardComponent,
    FavoritesListComponent,
    GmailValidatorDirective,
    ValidationErrorComponent,
    UniqueEmailValidatorDirective
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
  ],
  exports: [
    CardComponent,
    FavoritesListComponent,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    ValidationErrorComponent,
  ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}},
    GmailValidatorDirective,
    UniqueEmailValidatorDirective
  ]
})
export class SharedModule { }
