import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SearchComponent } from './search.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VideoListComponent } from './components/video-list/video-list.component';
import { VideoListItemComponent } from './components/video-list-item/video-list-item.component';
import { SearchService } from './services/search.service';

@NgModule({
  declarations: [
    VideoListComponent,
    VideoListItemComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    RouterModule.forChild([
      { path: '', component: SearchComponent }
    ])
  ],
  providers: [SearchService]
})
export class SearchModule { }
