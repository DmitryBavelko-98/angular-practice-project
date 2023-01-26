import { Injectable } from '@angular/core';
import { map, Observable, mergeMap, of, find, delay, from, tap } from 'rxjs';
import IUser from '../models/user';
import { FavoritesService } from '../../core/services/favorites.service';
import { FavoriteTypes } from 'src/app/modules/core/models/favorite-types';
import { UserApiService } from './user-api.service';
import { LoggerService } from '../../core/services/logger.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private favoriteService: FavoritesService, 
    private userApiService: UserApiService,
    private logger: LoggerService
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

  getUserInfo(userId: string): Observable<IUser | undefined> {
    const randomDelay: number = Math.round(Math.random() * (6000 - 1000) + 1000);

    this.logger.log(`data of user ${userId} requested`);

    return from(this.userApiService.currentUsers)
      .pipe(
        delay(randomDelay),
        find((user: IUser) => user.id === userId),
        tap((user) => this.logger.log(`data received: ${JSON.stringify(user)}`))
      );
  }

  saveUser(userId: string): Observable<string> {
    const randomDelay: number = Math.round(Math.random() * (6000 - 1000) + 1000);

    this.logger.log(`saving of user with id ${userId} is in process`);

    return of(this.userApiService.currentUsers)
      .pipe(
        delay(randomDelay),
        map(() => userId),
        tap(() => this.logger.log(`user with ${userId} saved`))
      );
  }
}
