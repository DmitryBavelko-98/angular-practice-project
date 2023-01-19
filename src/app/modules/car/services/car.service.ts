import { Injectable } from '@angular/core';
import ICar from '../../car/models/car';
import { CARS } from '../../car/mocks/cars';
import { FavoritesService } from '../../core/services/favorites.service';
import { FavoriteTypes } from 'src/app/modules/core/models/favorite-types';
import { Observable, of, delay, map, mergeMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private favoriteService: FavoritesService) {}

  getCars(): Observable<ICar[]> {
    return of(CARS).pipe(delay(100));
  }

  getLikedCars(): Observable<ICar[]> {
    return this.favoriteService.getFavorites(FavoriteTypes.Car)
      .pipe(
        mergeMap(ids => {
          return this.getCars()
            .pipe(
              map(cars => cars.filter(car => ids.includes(car.id)))
            )
        })
      );  
  }
}
