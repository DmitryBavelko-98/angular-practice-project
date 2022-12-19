import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent {
  @Input() data!: any;
  @Output() checkLikeStatus = new EventEmitter();
  isItemLiked: boolean = false;

  likeItem() {
    this.isItemLiked = !this.isItemLiked;
    this.checkLikeStatus.emit(this.data);
  }
}
