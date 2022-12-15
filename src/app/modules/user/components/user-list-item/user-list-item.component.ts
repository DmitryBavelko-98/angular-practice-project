import { 
        Component, 
        Input, 
        OnInit, 
        ChangeDetectionStrategy,
        ChangeDetectorRef
       } from '@angular/core';
import IUser from '../../models/user';

@Component({
  selector: 'app-user-list-item',
  templateUrl: './user-list-item.component.html',
  styleUrls: ['./user-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListItemComponent implements OnInit {
  @Input() userData!: IUser;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {}

  removeActivity() {    
    const {age, isActivated} = this.userData;

    if (age >= 18 && isActivated) {
      this.userData.isActivated = false;
      this.cdr.markForCheck();
    }
  }
}
