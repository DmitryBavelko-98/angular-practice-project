import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { delay, map, Observable } from 'rxjs';
import { HttpService } from '../../core/services/http.service';
import IUser from '../models/user';
import IResponseUser from '../models/response-user';
import IUserForm from '../models/user-form';
import transformUserData from '../utils/transformUserData';
import generateUserId from '../utils/generateUserId';
import { sortUsers } from '../utils/sortUsers';
import { LoggerService } from '../../core/services/logger.service';
import { createRandomDelay } from '../utils/createRandomDelay';
import { ISortOptions } from '../models/sort-options';
import { filterUsersByName } from '../utils/filterUsersByName';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  private users!: IUser[];

  constructor(private httpService: HttpService, private logger: LoggerService) { }

  get currentUsers() {
    return this.users;
  }

  getUsers(results: number = 10, page: number = 1, param: string = '', sortOptions: ISortOptions = {}): Observable<IUser[]> {
    const filter = param.toLowerCase();
    const sortData = JSON.stringify(sortOptions);

    return this.httpService.get(environment.apiURL, { page, results, filter, sortData })
      .pipe(
        map(res => {
          return this.users = res.body.results
            .map((user: IResponseUser) => transformUserData(user))
            .filter((user: IUser) => filterUsersByName(user, filter))
            .sort((first: IUser, second: IUser) => sortUsers(first, second, sortOptions));
        }),
      );
  }

  getUserById(id: string): Observable<IUser> {
    return this.getUsers()
      .pipe(
        map(users => users.find(user => user.id === id))
      ) as Observable<IUser>;

    // return this.httpService.get(environment.apiURL, {id})
    //   .pipe(
    //     map((res) => transformUserData(res.body.results[0]))
    //   );
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

  downloadUserExcel(userId: string): Observable<IUser | undefined> {
    this.logger.log(`data of user ${userId} requested`);

    return this.getUsers()
      .pipe(
        delay(createRandomDelay(1000, 6000)),
        map(users => users.find((user) => user.id === userId))
      );
  }

  downloadUser(userId: string): Observable<string> {
    this.logger.log(`saving of user with id ${userId} is in process`);

    return this.getUsers()
      .pipe(
        delay(createRandomDelay(1000, 6000)),
        map(() => userId),
      );
  }
}