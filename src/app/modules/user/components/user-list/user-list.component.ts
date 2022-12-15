import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { UserService } from '../../services/users-data.service';
import { UserListItemComponent } from '../user-list-item/user-list-item.component';
import IUser from '../../models/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  @ViewChildren(UserListItemComponent) userItemComponents!: QueryList<UserListItemComponent>;

  users: IUser[] = [];
  isUsersActive: boolean = true;
  isUsersDeactivated: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.users = this.userService.getUsers();
  }

  toggleUsers() {
    this.isUsersActive = !this.isUsersActive;
  }

  deactivateAllUsers() {
    this.userItemComponents.forEach(el => el.removeActivity());
    this.isUsersDeactivated = true;
  }
}
