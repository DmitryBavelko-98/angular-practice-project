import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarPageComponent } from './components/carPage/car-page.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [
    CarPageComponent,
  ],
  imports: [
    CommonModule,
    MatInputModule,
    FormsModule,
  ],
  exports: [
    CarPageComponent,
  ],
})
export class CarModule { }
