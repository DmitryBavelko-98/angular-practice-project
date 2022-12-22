import { Component, EventEmitter, Input, Output } from '@angular/core';
import ICar from '../../models/car';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss']
})
export class CarListComponent {
  @Input() cars!: ICar[];
  @Input() favoriteCars!: number[];
  @Output() isLiked = new EventEmitter<ICar>();

  checkLike(car: ICar) {
    this.isLiked.emit(car);
  }
}
