import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() isItemLiked!: boolean;
  @Output() isLiked = new EventEmitter();

  likeItem() {
    this.isLiked.emit();
  }
}
