import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent {
  @Input() isItemLiked!: boolean;
  @Output() isLiked = new EventEmitter();

  likeItem() {
    this.isLiked.emit();
  }
}
