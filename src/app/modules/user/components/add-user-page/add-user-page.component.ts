import { Component, OnInit } from '@angular/core';
import IUser from '../../models/user';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { FormGroup }   from '@angular/forms';

@Component({
  selector: 'app-add-user-page',
  templateUrl: './add-user-page.component.html',
  styleUrls: ['./add-user-page.component.scss']
})
export class AddUserPageComponent implements OnInit {
  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  sendUserData(userData: IUser) {
    this.userService.addNewUser(userData);

    this.router.navigate(['users']);
  }
}

