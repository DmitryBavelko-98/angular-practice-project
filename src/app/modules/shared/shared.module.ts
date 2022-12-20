import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItemComponent } from './components/list-item/list-item.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FavoritesListComponent } from './components/favorites-list/favorites-list.component';



@NgModule({
  declarations: [
    ListItemComponent,
    FavoritesListComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [
    ListItemComponent,
    FavoritesListComponent
  ]
})
export class SharedModule { }
