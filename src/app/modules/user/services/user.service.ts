import { Injectable } from '@angular/core';
import { map, Observable, mergeMap, of} from 'rxjs';
import IUser from '../models/user';
import { FavoritesService } from '../../core/services/favorites.service';
import { FavoriteTypes } from 'src/app/modules/core/models/favorite-types';
import { UserApiService } from './user-api.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private favoriteService: FavoritesService, 
    private userApiService: UserApiService,
  ) {}

  getFavoriteUsers(): Observable<IUser[]> {
    return this.favoriteService.getFavorites(FavoriteTypes.User)
      .pipe(
        mergeMap(ids => {
          return of(this.userApiService.currentUsers)
            .pipe(
              map(users => users.filter(user => ids.includes(user.id)))
            )
        })
      );
  }
}
