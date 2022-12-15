import { Injectable } from '@angular/core';
import IUser from '../models/user';
import { USERS } from '../mocks/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  getUsers(): IUser[] {
    return USERS;
  }
}
