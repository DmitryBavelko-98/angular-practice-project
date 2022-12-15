import { 
        Component, 
        Input, 
        OnInit, 
        ChangeDetectionStrategy,
        Output,
        EventEmitter,
       } from '@angular/core';
import IUser from '../../models/user';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserItemComponent implements OnInit {
  @Input() userData!: IUser;
  @Output() deactivateUser = new EventEmitter<IUser>();

  constructor() { }

  ngOnInit(): void {}

  removeActivity() {    
    const {name, age, isActivated} = this.userData;

    if (age >= 18 && isActivated) {
      this.userData = {
        name,
        age,
        isActivated: false
      };
      this.deactivateUser.emit(this.userData);
    }
  }
}
