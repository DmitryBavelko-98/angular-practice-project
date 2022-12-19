import { Component, Input, Output, EventEmitter } from '@angular/core';
import IUser from '../../models/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent {
  @Input() users!: IUser[];
  @Output() checkLikes = new EventEmitter<IUser>();

  checkLike(user: IUser) {
    this.checkLikes.emit(user);
  }
}
