import { Injectable } from '@angular/core';
import ICar from '../../car/models/car';
import { CARS } from '../../car/mocks/cars';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  getCars(): ICar[] {
    return CARS;
  }
}
