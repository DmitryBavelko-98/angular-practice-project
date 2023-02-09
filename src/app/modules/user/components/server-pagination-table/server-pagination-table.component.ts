import { Component, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, tap, Subject, takeUntil } from 'rxjs';
import { PAGINATOR_PAGE_SIZE } from 'src/app/modules/shared/configs/paginator-config';
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
export class ServerPaginationTableComponent implements AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  paginatorPageSize = PAGINATOR_PAGE_SIZE;
  paginatorLength = PAGINTOR_LENGTH;
  paginatorOptions = PAGINTOR_OPTIONS;

  displayedColumns: string[] = ['lastName', 'email', 'age', 'addresses', 'department'];
  users!: IUser[];
  searchParam: string = '';
  sortOptions: ISortOptions = {};

  destroy$ = new Subject<void>();

  constructor(private userApi: UserApiService) { }

  ngAfterViewInit(): void {
    this.getCurrentUsers();

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => {
          const {active, direction} = this.sort

          this.sortOptions = {active, direction}

          this.getCurrentUsers();
        }),
        takeUntil(this.destroy$)  
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  getCurrentUsers(): void {
    this.userApi
      .getUsers(this.paginator.pageSize, this.paginator.pageIndex + 1,  this.searchParam, this.sortOptions)
      .pipe(takeUntil(this.destroy$))
      .subscribe(users => this.users = users);
  }
  
  
  findUsers(param: string): void {
    this.searchParam = param;

    this.getCurrentUsers();
  }
}
