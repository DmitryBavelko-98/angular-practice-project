import { Component } from '@angular/core';

@Component({
  selector: 'app-second-page',
  templateUrl: './second-page.component.html',
  styleUrls: ['./second-page.component.scss']
})
export class SecondPageComponent {
  pageNumber: number = 2;

  disabled = false;
  max = 100;
  min = 0;
  // showTicks = false
  tickInterval = 3;
  step = 1;
  thumbLabel = false;
  value = 0;
}
