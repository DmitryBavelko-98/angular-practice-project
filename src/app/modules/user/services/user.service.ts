import { Injectable } from '@angular/core';
import IUser from '../models/user';
import { FavoritesService } from '../../core/services/favorites.service';
import { FavoriteTypes } from 'src/app/modules/core/models/favorite-types';
import { map, Observable, of, mergeMap } from 'rxjs';
import IUserForm from '../models/user-form';
import IUserService from '../models/user-service';
import { HttpService } from '../../core/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users!: IUser[];

  constructor(private favoriteService: FavoritesService, private httpService: HttpService) {}

  getUsers(): Observable<IUser[]> {
    if (!this.users) {
      return this.httpService.getData('https://randomuser.me/api/?results=15')
        .pipe(
          map(({results}) =>  this.users = results.map((user: IUserService) => this.transformUserData(user))),
        );
    }

    return of(this.users);
  }

  getLikedUsers(): Observable<IUser[]> {
    return this.favoriteService.getFavorites(FavoriteTypes.User)
      .pipe(
        mergeMap(ids => {
          return this.getUsers().pipe(
            map(users => users.filter(user => ids.includes(user.id)))
          )
        })
      );
  }

  getFilteredUsers(param: string): Observable<IUser[]> {
    const searchParam = param.toLowerCase();

    return this.getUsers()
      .pipe(
        map(users => users.filter(user => {
          const fullName = `${user.firstName.toLowerCase()} ${user.lastName.toLowerCase()}`;

          if (fullName.includes(searchParam)) {
            return user;
          } 

          return;
        })),
      )
  }

  getUserById(id: string):  Observable<IUser> {
    return this.getUsers()
      .pipe(
        map(users => users.find(user => user.id === id))  
      ) as Observable<IUser>;
  }

  addNewUser(user: IUserForm): Observable<IUser[]> {
    const userData = {
      id: generateId(10),
      ...user,
    };

    function generateId(i: number): string {
      let rnd = '';
      while (rnd.length < i) 
          rnd += Math.random().toString(36).substring(2);
      return rnd.substring(0, i);
    }

    return this.httpService.postData(this.users, userData);
  }

  editUser(userData: IUser): Observable<IUser[]> {
    return this.httpService.editData(this.users, userData)
      .pipe(
        map(users => this.users = users)
      );
  }

  private transformUserData(user: IUserService): IUser {
    return  {
      id: user.id.value || 'data is not provided',
      firstName: `${user.name.title} ${user.name.first}`,
      lastName:  `${user.name.last}`,
      age: user.dob.age,
      gender: "male" ? true : false,
      department: 'Marketing',
      company: 'Google',
      email: user.email,
      imageUrl: user.picture.large,
      addresses: [
        {
          addressLine: `${user.location.street.name} ${user.location.street.number}`, 
          city: user.location.city, 
          zip: user.location.postcode
        }
      ],
    } as IUser;
  }
}
