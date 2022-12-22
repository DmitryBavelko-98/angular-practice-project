import { Component, EventEmitter, Input, Output } from '@angular/core';
import ICar from '../../models/car';

@Component({
  selector: 'app-car-list-item',
  templateUrl: './car-list-item.component.html',
  styleUrls: ['./car-list-item.component.scss']
})
export class CarListItemComponent {
  @Input() isItemLiked!: boolean;
  @Input() car!: ICar;
  @Output() isLiked = new EventEmitter();

  likeItem() {
    this.isLiked.emit();
  }
}
