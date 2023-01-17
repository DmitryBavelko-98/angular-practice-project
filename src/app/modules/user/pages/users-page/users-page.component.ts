import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FavoritesService } from 'src/app/modules/core/services/favorites.service';
import { FavoriteTypes } from 'src/app/modules/core/models/favorite-types';
import IUser from '../../models/user';
import { take } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit {
  users: IUser[] = [];
  favoriteIds: number[] = [];
  favoriteUsers: IUser[] = [];

  constructor(
    private userService: UserService,
    private favoriteService: FavoritesService
  ) {}

  ngOnInit(): void {
    this.userService.getUsers()
      .pipe(take(1))
      .subscribe(users => this.users = users);
    this.userService.getLikedUsers()
      .pipe(take(1))
      .subscribe(users => this.favoriteUsers = users);
  }

  likeItem(user: IUser): void {
    this.favoriteService.addToFavorites(FavoriteTypes.User, user.id);
    this.userService.getLikedUsers()
      .pipe(take(1))
      .subscribe(users => this.favoriteUsers = users);
  }

  findUsers(param: string): void {
    this.userService.getFilteredUsers(param)
      .pipe(take(1))
      .subscribe(users => this.users = users);
  }
}
