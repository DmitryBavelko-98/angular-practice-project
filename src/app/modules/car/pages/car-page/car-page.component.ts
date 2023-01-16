import { Component, OnInit, OnDestroy } from '@angular/core';
import { FavoritesService } from 'src/app/modules/core/services/favorites.service';
import { FavoriteTypes } from 'src/app/modules/core/models/favorite-types';
import ICar from '../../models/car';
import { CarService } from '../../services/car.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-car',
  templateUrl: './car-page.component.html',
  styleUrls: ['./car-page.component.scss'],
})
export class CarPageComponent implements OnInit, OnDestroy {
  cars: ICar[] = [];
  favoriteIds: number[] = [];
  favoriteCars: ICar[] = [];
  subscriptions: Subscription[] = [];

  constructor(
    private carService: CarService,
    private favoriteService: FavoritesService
  ) {}

  ngOnInit(): void {  
    const carsSubscription = this.carService.getCars()
      .subscribe(cars => this.cars = cars);
    const favoritesSubscription = this.carService.getLikedCars()
      .subscribe(cars => this.favoriteCars = cars);

    this.subscriptions.push(carsSubscription, favoritesSubscription);  
  }

  checkLikedList(car: ICar) {
    this.favoriteService.addToFavorites(FavoriteTypes.Car, car.id);
    const likeSubscription = this.carService.getLikedCars()
      .subscribe(cars => this.favoriteCars = cars);

    this.subscriptions.push(likeSubscription);  
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
