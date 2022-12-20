import { Injectable } from '@angular/core';
import ICar from '../../car/models/car';
import { CARS } from '../../car/mocks/cars';
import { FavoritesService } from '../../core/services/favorites.service';
import { FavoriteTypes } from 'src/app/modules/core/models/favorite-types';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private favoriteService: FavoritesService) {}

  getCars(): ICar[] {
    return CARS;
  }

  getLikedCars(): ICar[] {
    const likedIds = this.favoriteService.getFavorites(FavoriteTypes.Car);

    return this.getCars().filter(car => likedIds.includes(car.id));
  }
}
