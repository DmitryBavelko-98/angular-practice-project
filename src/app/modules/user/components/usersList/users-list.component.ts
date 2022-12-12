import { Component} from '@angular/core';
import User from '../../user';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent {
  nonActiveUsers: boolean = true;
  hideMessage: string = 'Hide non-active users';
  showMessage: string = 'Show non-active users';

  users: User[] = [
    {name: 'Ivan', age: 20, isActivated: false},
    {name: 'Dima', age: 30, isActivated: true},
    {name: 'Alex', age: 24, isActivated: true},
    {name: 'Anna', age: 37, isActivated: false},
    {name: 'Max', age: 23, isActivated: true},
  ];

  toggleUsers() {
    this.nonActiveUsers = !this.nonActiveUsers;
  }

  removeActivity(userName: string) {
    const user = this.users.find(user => user.name === userName);
    
    user!.isActivated = false;
  }
}
