import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, Observable, of } from 'rxjs';
import { IUserCredentials } from '../models/user-credentials';
import { users } from '../mocks/users';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  user$ = new BehaviorSubject<string>('');

  constructor() {}

  getUsers(): Observable<IUserCredentials[]> {
    return of(users).pipe(delay(500));
  }

  registerUser(userCred: IUserCredentials): Observable<boolean> {
    users.push(userCred);

    return of(true).pipe(delay(500));
  }

  loginUser(userCred: IUserCredentials): Observable<boolean> {
    for (let cred of users) {
      if (cred.userName === userCred.userName && cred.password === userCred.password) {
        this.setCurrentUser(cred.userName);
        return of(true).pipe(delay(500));
      }
    }

    return of(false).pipe(delay(500));
  }

  logoutUser(): Observable<string> {
    this.setCurrentUser('');

    // this.user$.next('');

    return this.getCurrentUser();
  }

  setCurrentUser(userName: string): void {
    localStorage.setItem('user', userName);

    this.user$.next(localStorage.getItem('user') as string);

    // this.user$.next(userName);
  }

  findUser(): IUserCredentials {
    return users.find(user => user.userName === localStorage.getItem('user')) as IUserCredentials;
  }

  getCurrentUser(): Observable<string> {
    if (localStorage.getItem('user')) {
      this.loginUser(this.findUser()).pipe(delay(500));
    }

    return this.user$.asObservable().pipe(delay(500));    
  }
}
