import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FavoritesService } from 'src/app/modules/core/services/favorites.service';
import { FavoriteTypes } from 'src/app/modules/core/models/favorite-types';
import IUser from '../../models/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit, OnDestroy {
  users: IUser[] = [];
  favoriteIds: number[] = [];
  favoriteUsers: IUser[] = [];
  subscriptions: Subscription[] = [];

  constructor(
    private userService: UserService,
    private favoriteService: FavoritesService
  ) {}

  ngOnInit(): void {
    const usersSubscription = this.userService.getUsers()
      .subscribe(users => this.users = users);
    const favoritesSubscription =  this.userService.getLikedUsers()
      .subscribe(users => this.favoriteUsers = users);

    this.subscriptions.push(usersSubscription, favoritesSubscription);
  }

  likeItem(user: IUser): void {
    this.favoriteService.addToFavorites(FavoriteTypes.User, user.id);
    const likeSubscription = this.userService.getLikedUsers()
      .subscribe(users => this.favoriteUsers = users);

    this.subscriptions.push(likeSubscription); 
  }

  findUsers(param: string): void {
    this.userService.getFilteredUsers(param.toLowerCase())
      .subscribe(users => this.users = users);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
