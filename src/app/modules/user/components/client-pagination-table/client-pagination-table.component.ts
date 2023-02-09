import {OnInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { take } from 'rxjs';
import IUser from '../../models/user';
import { UserApiService } from '../../services/user-api.service';
import { PAGINATOR_PAGE_SIZE } from 'src/app/modules/shared/configs/paginator-config';
import { PAGINTOR_LENGTH } from 'src/app/modules/shared/configs/paginator-config';
import { PAGINTOR_OPTIONS } from 'src/app/modules/shared/configs/paginator-config';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-client-pagination-table',
  templateUrl: './client-pagination-table.component.html',
  styleUrls: ['./client-pagination-table.component.scss']
})
export class ClientPaginationTableComponent implements OnInit {
  dataSource = new MatTableDataSource<IUser>();
  displayedColumns: string[] = ['lastName', 'email', 'age', 'addresses', 'department'];

  paginatorPageSize = PAGINATOR_PAGE_SIZE;
  paginatorLength = PAGINTOR_LENGTH;
  paginatorOptions = PAGINTOR_OPTIONS;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userApi: UserApiService) {}

  ngOnInit(): void {
    this.userApi.getUsers(this.paginatorLength)
      .pipe(take(1))
      .subscribe(users => {
        this.dataSource.data = users;
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator;
      });
  }
}
