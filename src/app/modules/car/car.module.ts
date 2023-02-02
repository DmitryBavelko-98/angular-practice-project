import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarPageComponent } from './pages/car-page/car-page.component';
import { FormsModule } from '@angular/forms';
import { CarListComponent } from './components/car-list/car-list.component';
import { SharedModule } from '../shared/shared.module';
import { CarListItemComponent } from './components/car-list-item/car-list-item.component';
import { CarRoutingModule } from './car-routing.module';


@NgModule({
  declarations: [
    CarPageComponent,
    CarListComponent,
    CarListItemComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    CarRoutingModule,
  ],
  exports: [
    CarPageComponent,
  ],
})
export class CarModule { }
