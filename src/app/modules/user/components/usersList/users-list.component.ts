import { Component, OnInit, ViewChildren, QueryList, ViewEncapsulation } from '@angular/core';
import { UsersDataService } from '../../services/users-data.service';
import { UserItemComponent } from '../user-item/user-item.component';
import IUser from '../../models/user';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  providers: [UsersDataService],
})
export class UsersListComponent implements OnInit {
  @ViewChildren(UserItemComponent) viewChildren!: QueryList<UserItemComponent>;

  users: IUser[] = [];
  nonActiveUsers: boolean = true;
  usersDeactivated: boolean = false;

  constructor(private userService: UsersDataService) {}

  ngOnInit(): void {
    this.users = this.userService.getUsers();
  }

  toggleUsers() {
    this.nonActiveUsers = !this.nonActiveUsers;
  }

  deactivateUser(deactivatedUser: IUser) {
    this.users = this.users.map((user: IUser) => {
      return (deactivatedUser.name === user.name) 
        ? {name: user.name, age: user.age, isActivated: false}
        : user;
      }
    );
  }

  deactivateAllUsers() {
    this.viewChildren.forEach(el => el.removeActivity());
    this.usersDeactivated = true;
  }
}
