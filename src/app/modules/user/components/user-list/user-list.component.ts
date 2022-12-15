import { Component, Input, ViewChildren, QueryList } from '@angular/core';
import IUser from '../../models/user';
import { UserListItemComponent } from '../user-list-item/user-list-item.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent {
  @ViewChildren(UserListItemComponent) userItemComponents!: QueryList<UserListItemComponent>;

  @Input() users!: IUser[];
  isUsersActive: boolean = true;
  isUsersDeactivated: boolean = false;

  toggleUsers() {
    this.isUsersActive = !this.isUsersActive;
  }

  deactivateAllUsers() {
    this.userItemComponents.forEach(el => el.removeActivity());
    this.isUsersDeactivated = true;
  }
}
