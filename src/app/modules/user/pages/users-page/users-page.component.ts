import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FavoritesService } from 'src/app/modules/core/services/favorites.service';
import { FavoriteTypes } from 'src/app/modules/core/models/favorite-types';
import IUser from '../../models/user';
import { concatMap, exhaustMap, finalize, mergeMap, Observable, Subject, switchMap, take, takeUntil } from 'rxjs';
import { UserApiService } from '../../services/user-api.service';
import { MatPaginator } from '@angular/material/paginator';
import { PAGINATOR_PAGE_SIZE } from 'src/app/modules/shared/configs/paginator-config';
import { PAGINTOR_LENGTH } from 'src/app/modules/shared/configs/paginator-config';
import { PAGINTOR_OPTIONS } from 'src/app/modules/shared/configs/paginator-config';
import { LoggerService } from 'src/app/modules/core/services/logger.service';

@Component({
  selector: 'app-users',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit, OnDestroy {
  @ViewChild('paginator') paginator!: MatPaginator; 

  users: IUser[] = [];
  favoriteUsers: IUser[] = [];
  paginatorPageSize = PAGINATOR_PAGE_SIZE;
  paginatorLength = PAGINTOR_LENGTH;
  paginatorOptions = PAGINTOR_OPTIONS;
  searchParam: string = '';

  loading: boolean = false;

  destroy$ = new Subject<void>();
  refresh$ = new Subject<void>();
  blockingRefresh$ = new Subject<void>();
  userInfo$ = new Subject<string>();
  saveUser$ = new Subject<string>();

  constructor(
    private userApi: UserApiService,
    public userService: UserService,
    private favoriteService: FavoritesService,
    private logger: LoggerService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.uploadUsers();
      this.initSubjects();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  private getCurrentUsers(): Observable<IUser[]> {
    this.users = [];
    this.favoriteUsers = [];
    this.loading = true;

    return this.userApi
      .getUsers(this.paginator.pageSize, this.paginator.pageIndex + 1, this.searchParam)
      .pipe(finalize(() => this.loading = false));
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
        switchMap(() => this.getCurrentUsers()),
        takeUntil(this.destroy$)
      )
      .subscribe(users => this.initUsers(users));

    this.blockingRefresh$.asObservable()
      .pipe(
        exhaustMap(() => this.getCurrentUsers()),
        takeUntil(this.destroy$)
      )
      .subscribe(users => this.initUsers(users));

    this.userInfo$.asObservable()
      .pipe(
        mergeMap((userId: string) => this.userApi.downloadUserExcel(userId)),
        takeUntil(this.destroy$)
      )
      .subscribe((user) => this.logger.log(`data received: ${JSON.stringify(user)}`));

    this.saveUser$.asObservable()
      .pipe(
        concatMap((userId: string) => this.userApi.downloadUser(userId)),
        takeUntil(this.destroy$)
      )
      .subscribe((userId) => this.logger.log(`user with ${userId} saved`));
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
