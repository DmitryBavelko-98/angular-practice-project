import { Component, EventEmitter, Input, Output } from '@angular/core';
import IUser from '../../models/user';

@Component({
  selector: 'app-user-list-item',
  templateUrl: './user-list-item.component.html',
  styleUrls: ['./user-list-item.component.scss']
})
export class UserListItemComponent {
  @Input() user!: IUser;
  @Input() isItemLiked!: boolean;
  @Output() isLiked = new EventEmitter();

  likeItem() {
    this.isLiked.emit();
  }
}
