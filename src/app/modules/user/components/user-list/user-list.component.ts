import { Component, Input, Output, EventEmitter } from '@angular/core';
import IUser from '../../models/user';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent {
  @Input() users!: IUser[];
  @Input() favoriteUsers!: IUser[];
  @Output() isLiked = new EventEmitter<IUser>();

  page: number = 1;
  pageEvent!: PageEvent;
  pageSize: number = 10;
  pageSizes = [10, 20, 50];

  constructor() {}

  setPage(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.page = event.pageIndex + 1;
  }

  likeItem(user: IUser): void {    
    this.isLiked.emit(user);
  }
}
