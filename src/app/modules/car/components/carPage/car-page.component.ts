import { Component, OnInit } from '@angular/core';
import { LikeService } from 'src/app/modules/core/services/like.service';
import ICar from '../../models/car';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car-page.component.html',
  styleUrls: ['./car-page.component.scss'],
})
export class CarPageComponent implements OnInit {
  car: string = '';
  cars: ICar[] = [];
  likedCars: ICar[] = [];

  constructor(
    private carService: CarService,
    private likeService: LikeService
  ) {}

  ngOnInit(): void {  
    this.cars = this.carService.getCars();
    this.likedCars = this.likeService.getCars();
  }

  checkLikedList(car: any) {
    this.likeService.addCar(car);
  }
}
