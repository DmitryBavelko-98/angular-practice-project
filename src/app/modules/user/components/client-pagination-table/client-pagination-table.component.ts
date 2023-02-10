import {OnInit, Component, ViewChild, AfterViewInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs';
import IUser from '../../models/user';
import { UserApiService } from '../../services/user-api.service';
import { PAGINATOR_DEFAULT_PAGE_SIZE } from 'src/app/modules/shared/configs/paginator-config';
import { PAGINTOR_LENGTH } from 'src/app/modules/shared/configs/paginator-config';
import { PAGINTOR_OPTIONS } from 'src/app/modules/shared/configs/paginator-config';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-client-pagination-table',
  templateUrl: './client-pagination-table.component.html',
  styleUrls: ['./client-pagination-table.component.scss']
})
export class ClientPaginationTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource<IUser>();
  displayedColumns: string[] = ['fullName', 'email', 'age', 'addresses', 'department'];

  paginatorPageSize = PAGINATOR_DEFAULT_PAGE_SIZE;
  paginatorLength = PAGINTOR_LENGTH;
  paginatorOptions = PAGINTOR_OPTIONS;

  constructor(private userApi: UserApiService) {
    this.dataSource.sortingDataAccessor = this.sortingDataAccessor;
  }

  ngOnInit(): void {
    this.userApi.getUsers(this.paginatorLength)
      .pipe(take(1))
      .subscribe(users => this.dataSource.data = users);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  private sortingDataAccessor = (item: IUser, colName: string) => {

    switch(colName) {
      case 'fullName': 
        return item.lastName;

      default: 
        //@ts-ignore
        return item[colName]  
    }

  }
}
