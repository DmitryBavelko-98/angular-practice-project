import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { LikeService } from 'src/app/modules/core/services/like.service';
import IUser from '../../models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
  users: IUser[] = [];
  likedUsers: IUser[] = [];

  constructor(
    private userService: UserService,
    private likeService: LikeService
  ) {}

  ngOnInit(): void {
    this.users = this.userService.getUsers();
    this.likedUsers = this.likeService.getUsers();
  }

  checkLikedList(user: IUser) {
    this.likeService.addUser(user);
  }
}
