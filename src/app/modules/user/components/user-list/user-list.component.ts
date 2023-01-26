import { Component, Input, Output, EventEmitter } from '@angular/core';
import IUser from '../../models/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent {
  @Input() users!: IUser[];
  @Input() favoriteUsers!: IUser[];
  @Output() isLiked = new EventEmitter<IUser>();
  @Output() userInfoRequested = new EventEmitter<string>();
  @Output() userSaved = new EventEmitter<string>();

  constructor() {}

  likeItem(user: IUser): void {    
    this.isLiked.emit(user);
  }

  requestUserInfo(userId: string) {
    this.userInfoRequested.emit(userId);
  }

  saveUser(userId: string) {
    this.userSaved.emit(userId);
  }
}
