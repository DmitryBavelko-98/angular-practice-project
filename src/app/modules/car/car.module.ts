import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarPageComponent } from './components/carPage/car-page.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CarListComponent } from './components/car-list/car-list.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    CarPageComponent,
    CarListComponent,
  ],
  imports: [
    CommonModule,
    MatInputModule,
    FormsModule,
    SharedModule
  ],
  exports: [
    CarPageComponent,
  ],
})
export class CarModule { }
