import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CardComponent } from './components/card/card.component';
import { FavoritesListComponent } from './components/favorites-list/favorites-list.component';
import { GmailValidatorDirective } from './directives/gmail-validator.directive';
import { ValidationErrorComponent } from './components/validation-error/validation-error.component';
import { UniqueEmailValidatorDirective } from './directives/unique-email-validator.directive';
import { AddressFormComponent } from './components/address-form/address-form.component';
import { AddressesListComponent } from './components/addresses-list/addresses-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchFieldComponent } from './components/search-field/search-field.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MenuComponent } from './components/menu/menu.component';
import { FullNamePipe } from './pipes/full-name.pipe';
import { AddressPipe } from './pipes/address.pipe';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    CardComponent,
    FavoritesListComponent,
    GmailValidatorDirective,
    ValidationErrorComponent,
    UniqueEmailValidatorDirective,
    AddressesListComponent,
    AddressFormComponent,
    SearchFieldComponent,
    MenuComponent,
    FullNamePipe,
    AddressPipe,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatMenuModule,
    MatTabsModule,
    MatTableModule,
    MatSortModule
  ],
  exports: [
    CardComponent,
    FavoritesListComponent,
    AddressesListComponent,
    AddressFormComponent,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatTabsModule,
    MatTableModule,
    MatSortModule,
    ValidationErrorComponent,
    ReactiveFormsModule,
    SearchFieldComponent,
    MenuComponent,
    FullNamePipe,
    AddressPipe,
  ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}},
    GmailValidatorDirective,
    UniqueEmailValidatorDirective,
  ]
})
export class SharedModule { }
