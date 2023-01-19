import { Injectable } from '@angular/core';
import { FavoriteTypes } from '../models/favorite-types';
import { FavoriteStore }  from '../models/favorite-store';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  store: FavoriteStore = {
    [FavoriteTypes.User]: [],
    [FavoriteTypes.Car]: [],
  }

  addToFavorites(type: FavoriteTypes, id: string): Observable<string[]> {
    const index = this.store[type].indexOf(id);

    if (index === -1) {
      this.store[type].push(id);
    } else {
      this.store[type].splice(index, 1);
    }

    return this.getFavorites(type).pipe(delay(100));
  }

  getFavorites(type: FavoriteTypes): Observable<string[]> {
    return of(this.store[type]).pipe(delay(200));
  }
}
