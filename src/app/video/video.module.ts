import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VideoComponent } from './video.component';
import { LiveChatComponent } from './components/live-chat/live-chat.component';
import { ChatMessageListComponent } from './components/chat-message-list/chat-message-list.component';
import { ChatMessageListItemComponent } from './components/chat-message-list-item/chat-message-list-item.component';
import { ChatService } from './services/chat.service';
import { VideoService } from './services/video.service';
import { AuthorChatComponent } from './components/author-chat/author-chat.component';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ChatMessageComposeComponent } from './components/chat-message-compose/chat-message-compose.component';

@NgModule({
  declarations: [
    VideoComponent,
    LiveChatComponent,
    ChatMessageListComponent,
    ChatMessageListItemComponent,
    AuthorChatComponent,
    ChatMessageComposeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    RouterModule.forChild([
      { path: ':videoId', component: VideoComponent, children: [
        { path: '', outlet: 'chat', component: LiveChatComponent },
        { path: 'author/:authorId', outlet: 'chat', component: AuthorChatComponent }
      ]}
    ])
  ],
  providers: [ ChatService, VideoService ]
})
export class VideoModule { }
