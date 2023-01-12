import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-guard-popup',
  templateUrl: './guard-popup.component.html',
  styleUrls: ['./guard-popup.component.scss']
})
export class GuardPopupComponent {
  @Input() isOpened!: boolean;
  @Input() message!: string;
  @Output() responseReady = new EventEmitter();

  constructor() { }

  sendPopupResponse(value: boolean): void {
    this.responseReady.emit(value);
  }
}
