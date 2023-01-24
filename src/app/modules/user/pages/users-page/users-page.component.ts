import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FavoritesService } from 'src/app/modules/core/services/favorites.service';
import { FavoriteTypes } from 'src/app/modules/core/models/favorite-types';
import IUser from '../../models/user';
import { catchError, finalize, take, throwError } from 'rxjs';
import { UserApiService } from '../../services/user-api.service';
import { PageEvent } from '@angular/material/paginator';
import { paginatorConfig } from 'src/app/modules/shared/configs/paginator-config';

@Component({
  selector: 'app-users',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit {
  users: IUser[] = [];
  favoriteUsers: IUser[] = [];
  paginatorData = paginatorConfig;
  pageSize: number = this.paginatorData.pageSize;
  currentPage: number = 1;
  searchParam: string = '';

  loading: boolean = false;
  showError: boolean = false;

  constructor(
    private userApi: UserApiService,
    public userService: UserService,
    private favoriteService: FavoritesService,
  ) {}

  ngOnInit(): void {
    this.getCurrentUsers();
  }

  getCurrentUsers(pageSize: number = 10, pageIndex: number = 1): void {
    this.loading = true;
    this.userApi.getUsers(this.searchParam, pageSize, pageIndex)
    .pipe(
      take(1),
      catchError(err => {
        this.showError = true;
        return throwError(err);
      }),
      finalize(() => this.loading = false)
    )
    .subscribe(users => {
      this.users = users;

      this.userService.getLikedUsers()
      .pipe(take(1))
      .subscribe(favoriteUsers => this.favoriteUsers = favoriteUsers);
    });
  }

  likeItem(user: IUser): void {
    this.favoriteService.addToFavorites(FavoriteTypes.User, user.id);
    this.userService.getLikedUsers()
      .pipe(take(1))
      .subscribe(favoriteUsers => this.favoriteUsers = favoriteUsers)
  }

  findUsers(param: string): void {
      this.searchParam = param;

      this.userApi.getUsers(this.searchParam, this.pageSize)
      .pipe(take(1))
      .subscribe(users => {
        this.users = users;
      });
  }

  uploadUsers(page: PageEvent): void {
    this.pageSize = page.pageSize;

    this.getCurrentUsers(this.pageSize, page.pageIndex + 1);
  }
}
