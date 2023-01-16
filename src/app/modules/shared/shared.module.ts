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
import { AddressFormComponent } from './components/address-form/address-form.component';
import { AddressesListComponent } from './components/addresses-list/addresses-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GuardPopupComponent } from './components/guard-popup/guard-popup.component';
import { SearchFieldComponent } from './components/search-field/search-field.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    CardComponent,
    FavoritesListComponent,
    GmailValidatorDirective,
    ValidationErrorComponent,
    UniqueEmailValidatorDirective,
    AddressesListComponent,
    AddressFormComponent,
    GuardPopupComponent,
    SearchFieldComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    ReactiveFormsModule,
  ],
  exports: [
    CardComponent,
    FavoritesListComponent,
    AddressesListComponent,
    AddressFormComponent,
    GuardPopupComponent,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    ValidationErrorComponent,
    ReactiveFormsModule,
    SearchFieldComponent
  ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}},
    GmailValidatorDirective,
    UniqueEmailValidatorDirective
  ]
})
export class SharedModule { }
