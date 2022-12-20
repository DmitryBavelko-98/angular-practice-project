import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FavoritesService } from 'src/app/modules/core/services/favorites.service';
import { FavoriteTypes } from 'src/app/modules/core/models/favorite-types';
import IUser from '../../models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
  users: IUser[] = [];
  favoriteIds: number[] = [];
  favoriteUsers: IUser[] = [];

  constructor(
    private userService: UserService,
    private favoriteService: FavoritesService
  ) {}

  ngOnInit(): void {
    this.users = this.userService.getUsers();
    this.favoriteIds = this.favoriteService.getFavorites(FavoriteTypes.User);
    this.favoriteUsers = this.userService.getLikedUsers();
  }

  checkLikedList(user: IUser) {
    this.favoriteService.addToFavorites(FavoriteTypes.User, user.id);
    this.favoriteUsers = this.userService.getLikedUsers();
  }
}
