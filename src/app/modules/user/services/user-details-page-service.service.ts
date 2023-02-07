import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, map } from 'rxjs';
import IUser from '../models/user';
import { UserApiService } from './user-api.service';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsPageService {
  currentUser = new BehaviorSubject<IUser | null>(null);

  constructor(private userApi: UserApiService) { }

  setCurrentUser(userId: string): Observable<IUser | null> {
    return this.userApi.getUserById(userId)
      .pipe(map(user => {
        this.currentUser.next(user || null);
        return this.currentUser.value;
      }));
  }

  getCurrentUser(): Observable<IUser | null> {
      return this.currentUser.asObservable();
  }
}
