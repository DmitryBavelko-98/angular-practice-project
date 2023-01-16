import { Injectable } from '@angular/core';
import IUser from '../models/user';
import { USERS } from '../mocks/users';
import { FavoritesService } from '../../core/services/favorites.service';
import { FavoriteTypes } from 'src/app/modules/core/models/favorite-types';
import { map, Observable, of, delay } from 'rxjs';
import IUserForm from '../models/user-form';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private favoriteService: FavoritesService) {}

  getUsers(): Observable<IUser[]> {
    return of(USERS).pipe(delay(500));
  }

  getLikedUsers(): Observable<IUser[]> {
    const likedIds = this.favoriteService.getFavorites(FavoriteTypes.User);

    return this.getUsers()
      .pipe(
        map(users => users.filter(user => likedIds.includes(user.id)))
      );
  }

  getFilteredUsers(param: string): Observable<IUser[]> {
    return this.getUsers()
      .pipe(
        map(users => users.filter(user => {
          const firstName = user.firstName.toLowerCase();
          const lastName = user.lastName.toLowerCase();
          const fullName = `${firstName} ${lastName}`;

          if (!fullName.includes(param)) {
            return;
          } else {
            return user;
          }
        })),
      )
  }

  getUserById(id: number):  Observable<IUser> {
    return this.getUsers()
      .pipe(
        map(users => users.find(user => user.id === id))  
      ) as Observable<IUser>;
  }

  addNewUser(user: IUserForm): void {
    USERS.push({
      id: USERS.length + 1,
      ...user,
    });
  }

  updateUser(userData: IUser): void {
   const userIndex = USERS.findIndex(user => user.id === userData.id);

   USERS[userIndex] = userData;
  }
}
