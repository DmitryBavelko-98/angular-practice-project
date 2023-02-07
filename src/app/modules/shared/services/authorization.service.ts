import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, Observable, of } from 'rxjs';
import { IUserCredentials } from '../../authorization/models/user-credentials';
import { users } from '../../authorization/mocks/users';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  user$ = new BehaviorSubject<string>('');
  isUserAuthorized = !!JSON.parse(localStorage.getItem('user') as string);

  constructor() {
    this.user$.next(localStorage.getItem('user') as string);
  }

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
        this.isUserAuthorized = true;
        this.setCurrentUser(cred);
        return of(true).pipe(delay(500));
      }
    }

    return of(false).pipe(delay(500));
  }

  logoutUser(): Observable<string> {
    this.isUserAuthorized = false;
    this.setCurrentUser('');

    return this.getCurrentUser();
  }

  setCurrentUser(user: IUserCredentials | string): void {
    localStorage.setItem('user', JSON.stringify(user));

    this.user$.next(localStorage.getItem('user') as string);
  }

  getCurrentUser(): Observable<string> {
    return this.user$.asObservable().pipe(delay(500));    
  }
}
