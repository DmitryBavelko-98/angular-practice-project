import { Component, EventEmitter, Input, Output } from '@angular/core';
import IUser from '../../models/user';

const DEFAULT_USER_IMG = 'assets/img/user/default_avatar.png';

@Component({
  selector: 'app-user-list-item',
  templateUrl: './user-list-item.component.html',
  styleUrls: ['./user-list-item.component.scss']
})
export class UserListItemComponent {
  defaultImage: string = DEFAULT_USER_IMG;
  @Input() user!: IUser;
  @Input() isItemLiked!: boolean;
  @Output() isLiked = new EventEmitter();

  likeItem(): void {
    this.isLiked.emit();
  }
}
