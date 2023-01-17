import { Injectable } from '@angular/core';
import { FavoriteTypes } from '../models/favorite-types';
import { FavoriteStore }  from '../models/favorite-store';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  store: FavoriteStore = {
    [FavoriteTypes.User]: [],
    [FavoriteTypes.Car]: [],
  }

  addToFavorites(type: FavoriteTypes, id: number): void {
    const index = this.store[type].indexOf(id);

    if (index === -1) {
      this.store[type].push(id);
    } else {
      this.store[type].splice(index, 1);
    }
  }

  getFavorites(type: FavoriteTypes): number[] {
    return this.store[type];
  }
}
