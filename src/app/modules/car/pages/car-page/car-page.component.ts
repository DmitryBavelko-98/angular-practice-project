import { Component, OnInit } from '@angular/core';
import { FavoritesService } from 'src/app/modules/core/services/favorites.service';
import { FavoriteTypes } from 'src/app/modules/core/models/favorite-types';
import ICar from '../../models/car';
import { CarService } from '../../services/car.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-car',
  templateUrl: './car-page.component.html',
  styleUrls: ['./car-page.component.scss'],
})
export class CarPageComponent implements OnInit {
  cars: ICar[] = [];
  favoriteIds: number[] = [];
  favoriteCars: ICar[] = [];

  constructor(
    private carService: CarService,
    private favoriteService: FavoritesService
  ) {}

  ngOnInit(): void {  
    this.carService.getCars()
      .pipe(take(1))
      .subscribe(cars => this.cars = cars);
    this.carService.getLikedCars()
      .pipe(take(1))
      .subscribe(cars => this.favoriteCars = cars);
  }

  checkLikedList(car: ICar) {
    this.favoriteService.addToFavorites(FavoriteTypes.Car, car.id);
    this.carService.getLikedCars()
      .pipe(take(1))
      .subscribe(cars => this.favoriteCars = cars);
  }
}
