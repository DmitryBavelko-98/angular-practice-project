import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItemComponent } from './components/list-item/list-item.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LikedListComponent } from './components/liked-list/liked-list.component';



@NgModule({
  declarations: [
    ListItemComponent,
    LikedListComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [
    ListItemComponent,
    LikedListComponent
  ]
})
export class SharedModule { }
