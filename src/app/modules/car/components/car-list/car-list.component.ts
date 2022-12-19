import { Component, EventEmitter, Input, Output } from '@angular/core';
import ICar from '../../models/car';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss']
})
export class CarListComponent {
  @Input() cars!: ICar[];
  @Output() checkLikes = new EventEmitter<ICar>();

  checkLike(car: ICar) {
    this.checkLikes.emit(car);
  }
}
