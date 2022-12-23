import { Component, OnInit } from '@angular/core';
import { FavoritesService } from 'src/app/modules/core/services/favorites.service';
import { FavoriteTypes } from 'src/app/modules/core/models/favorite-types';
import ICar from '../../models/car';
import { CarService } from '../../services/car.service';

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
    this.cars = this.carService.getCars();
    this.favoriteIds = this.favoriteService.getFavorites(FavoriteTypes.Car);
    this.favoriteCars = this.carService.getLikedCars();
  }

  checkLikedList(car: ICar) {
    this.favoriteService.addToFavorites(FavoriteTypes.Car, car.id);
    this.favoriteCars = this.carService.getLikedCars();
  }
}
