import { Component, ViewChild, AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, Subject, takeUntil, mergeMap, Observable, BehaviorSubject } from 'rxjs';
import { PAGINATOR_DEFAULT_PAGE_SIZE } from 'src/app/modules/shared/configs/paginator-config';
import { PAGINTOR_LENGTH } from 'src/app/modules/shared/configs/paginator-config';
import { PAGINTOR_OPTIONS } from 'src/app/modules/shared/configs/paginator-config';
import { ISortOptions } from '../../models/sort-options';
import IUser from '../../models/user';
import { UserApiService } from '../../services/user-api.service';

@Component({
  selector: 'app-server-pagination-table',
  templateUrl: './server-pagination-table.component.html',
  styleUrls: ['./server-pagination-table.component.scss']
})
export class ServerPaginationTableComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  paginatorPageSize = PAGINATOR_DEFAULT_PAGE_SIZE;
  paginatorLength = PAGINTOR_LENGTH;
  paginatorOptions = PAGINTOR_OPTIONS;

  displayedColumns: string[] = ['lastName', 'email', 'age', 'addresses', 'department'];
  users!: IUser[];
  sortOptions: ISortOptions = {};
  searchParam$ = new BehaviorSubject<string>('');

  destroy$ = new Subject<void>();

  constructor(private userApi: UserApiService) { }

  ngOnInit(): void {
    this.initUsers();
  }

  ngAfterViewInit(): void {
    merge(this.sort.sortChange, this.paginator.page, this.searchParam$)
      .pipe(
        mergeMap(() => {
          const {active, direction} = this.sort;
          this.sortOptions = {active, direction};
          return this.getCurrentUsers(this.paginator.pageSize, this.paginator.pageIndex, this.searchParam$.value, this.sortOptions)
        }),
        takeUntil(this.destroy$)  
      )
      .subscribe(users => this.users = users);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  private initUsers(): void {
    this.getCurrentUsers(this.paginatorPageSize, 0, '', {})
      .pipe(takeUntil(this.destroy$))
      .subscribe(users => this.users = users);
  }

  private getCurrentUsers(pageSize: number, pageIndex: number, searchParam: string, sortOptions: ISortOptions): Observable<IUser[]> {
    this.users = [];

    return this.userApi
      .getUsers(pageSize, pageIndex + 1,  searchParam, sortOptions);
  }
  
  findUsers(param: string): void {
    this.searchParam$.next(param);
  }
}
