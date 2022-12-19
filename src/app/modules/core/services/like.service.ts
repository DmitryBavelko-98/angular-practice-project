import { Injectable } from '@angular/core';
import ICar from '../../car/models/car';
import IUser from '../../user/models/user';

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  users: IUser[] = [];
  cars: ICar[] = [];

  private addDataToStorage(data: any, storage: any[]) {
    if (storage.includes(data)) {
      const index = storage.findIndex(el => el.id === data.id);

      storage.splice(index, 1);
    } else {
      storage.push(data);
    }
  }

  addUser(user: IUser) {
    this.addDataToStorage(user, this.users);
  }

  addCar(car: ICar) {
    this.addDataToStorage(car, this.cars);
  }

  getUsers() {
    return this.users;
  }

  getCars() {
    return this.cars;
  }
}
