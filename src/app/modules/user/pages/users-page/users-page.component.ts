import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FavoritesService } from 'src/app/modules/core/services/favorites.service';
import { FavoriteTypes } from 'src/app/modules/core/models/favorite-types';
import IUser from '../../models/user';
import { catchError, concatMap, exhaustMap, finalize, mergeMap, Observable, Subject, switchMap, take, takeWhile, throwError } from 'rxjs';
import { UserApiService } from '../../services/user-api.service';
import { MatPaginator } from '@angular/material/paginator';
import { paginatorConfig } from 'src/app/modules/shared/configs/paginator-config';

@Component({
  selector: 'app-users',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit, OnDestroy {
  @ViewChild('paginator') paginator!: MatPaginator; 

  exists: boolean = true;
  users: IUser[] = [];
  favoriteUsers: IUser[] = [];
  paginatorConf = paginatorConfig;
  searchParam: string = '';

  loading: boolean = false;

  refresh$ = new Subject<void>();
  blockingRefresh$ = new Subject<void>();
  userInfo$ = new Subject<string>();
  saveUser$ = new Subject<string>();

  constructor(
    private userApi: UserApiService,
    public userService: UserService,
    private favoriteService: FavoritesService,
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.uploadUsers();
      this.initSubjects();
    });
  }

  ngOnDestroy(): void {
    this.exists = false;
  }

  private getCurrentUsers(): Observable<IUser[]> {
    this.users = [];
    this.favoriteUsers = [];
    this.loading = true;

    return this.userApi
      .getUsers(this.searchParam, this.paginator.pageSize, this.paginator.pageIndex + 1)
      .pipe(
        take(1),
        finalize(() => this.loading = false)
      );
  }

  private initUsers(users: IUser[]) {
    this.users = users;
    this.getLikedUsers();
  }

  private getLikedUsers(): void {
    this.userService.getFavoriteUsers()
      .pipe(take(1))
      .subscribe(favoriteUsers => this.favoriteUsers = favoriteUsers);
  }
 
  private initSubjects(): void {
    this.refresh$.asObservable()
      .pipe(
        takeWhile(() => this.exists), 
        switchMap(() => this.getCurrentUsers())
      )
      .subscribe(users => this.initUsers(users));

    this.blockingRefresh$.asObservable()
      .pipe(
        takeWhile(() => this.exists), 
        exhaustMap(() => this.getCurrentUsers())
      )
      .subscribe(users => this.initUsers(users));

    this.userInfo$.asObservable()
      .pipe(
        takeWhile(() => this.exists), 
        mergeMap((userId: string) => this.userService.getUserInfo(userId))
      )
      .subscribe();

    this.saveUser$.asObservable()
      .pipe(
        takeWhile(() => this.exists), 
        concatMap((userId: string) => this.userService.saveUser(userId))
      )
      .subscribe();
  }

  refresh(): void {
    this.refresh$.next();
  }

  refreshWithBlocking(): void {
    this.blockingRefresh$.next();
  }

  downloadUserInfo(userId: string): void {
    this.userInfo$.next(userId);
  }

  saveUser(userId: string): void {
    this.saveUser$.next(userId);
  }

  uploadUsers(): void {
    this.getCurrentUsers()
      .subscribe(users => this.initUsers(users));
  }

  findUsers(param: string): void {
    this.searchParam = param;
    this.uploadUsers();
  }

  likeItem(user: IUser): void {
    this.favoriteService.addToFavorites(FavoriteTypes.User, user.id);
    this.getLikedUsers();
  }
}
