import { Component, Input, Output, EventEmitter } from '@angular/core';
import IUser from '../../models/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent {
  @Input() users!: IUser[];
  @Input() favoriteUsers!: number[];
  @Output() isLiked = new EventEmitter<IUser>();

  likeItem(user: IUser) {
    this.isLiked.emit(user);
  }
}
