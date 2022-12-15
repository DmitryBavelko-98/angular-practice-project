import { Injectable } from '@angular/core';
import IUser from '../models/user';
import { USERS } from '../mocks/users';

@Injectable()
export class UsersDataService {

  getUsers(): IUser[] {
    return USERS;
  }
}
