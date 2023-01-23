import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { find, map, Observable, of } from 'rxjs';
import { HttpService } from '../../core/services/http.service';
import IUser from '../models/user';
import IResponseUser from '../models/response-user';
import IUserForm from '../models/user-form';
import transformUserData from '../functions/transformUserData';
import generateUserId from '../functions/generateUserId';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  private users!: IUser[];

  constructor(private httpService: HttpService) { }

  get currentUsers() {
    return this.users;
  }

  getUsers(page: number = 1, results: number = 10): Observable<IUser[]> {
    return this.httpService.get(environment.apiURL, {page, results})
      .pipe(
        map((res) => this.users = res.body.results.map((user: IResponseUser) => transformUserData(user))),
      );
  }

  getFilteredUsers(param: string): Observable<IUser[]> {
    const name = param.toLowerCase();

    return this.httpService.get(environment.apiURL, {name})
      .pipe(
        map((res) => res.body.results.map((user: IResponseUser) => transformUserData(user))),
      )
  }

  getUserById(id: string): Observable<IUser> {
    return this.httpService.get(environment.apiURL, {id})
      .pipe(
        map((res) => {
          console.log(res)
          return transformUserData(res.body.results[0])
        })
      );
  }

  addNewUser(user: IUserForm): Observable<IUser> {
    const userData = {
      id: generateUserId(10),
      ...user,
    };
    
    return this.httpService
      .post<IUser>(environment.apiURL + '/users/add', userData)
      .pipe(map(res => transformUserData(res)));
  }

  editUser(userData: IUser): Observable<IUser> {
    return this.httpService
      .put<IUser>(environment.apiURL + '/users/edit', userData)
      .pipe(map(res => transformUserData(res)));
  }
}

  // return this.getUsers(page)
  //   .pipe(
  //     map(users => users.find((user) =>  user.id === id))
  //   ) as Observable<IUser>;


    // return this.getUsers()
    //   .pipe(
    //     map(res => {
    //       res.push(userData);
    //       return res;
    //     })
    //   );


    // return this.getUsers()
    //   .pipe(
    //     map(res => {
    //         const index = res.findIndex((res: any) => res.id === userData.id);

    //         this.users[index] = userData;

    //         return this.users;
    //       }
    //     )
    //   );