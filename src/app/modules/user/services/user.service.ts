import { Injectable } from '@angular/core';
import IUser from '../models/user';
import { USERS } from '../mocks/users';
import { FavoritesService } from '../../core/services/favorites.service';
import { FavoriteTypes } from 'src/app/modules/core/models/favorite-types';
import IUserForm from '../models/user-form';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private favoriteService: FavoritesService) {}

  getUsers(): IUser[] {
    return USERS;
  }

  getLikedUsers(): IUser[] {
    const likedIds = this.favoriteService.getFavorites(FavoriteTypes.User);

    return this.getUsers().filter(user => likedIds.includes(user.id));
  }

  getUserById(id: number): IUser {
    return this.getUsers().find(user => user.id === id) as IUser;
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
