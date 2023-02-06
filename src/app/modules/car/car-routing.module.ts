import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarPageComponent } from './pages/car-page/car-page.component';

const routes: Routes = [
  {
    path: '',
    title: 'Cars',
    component: CarPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarRoutingModule { }