import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { VideoService } from '../../services/video.service';
import { filter, takeWhile, take, map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-live-chat',
  templateUrl: './live-chat.component.html',
  styleUrls: ['./live-chat.component.css']
})
export class LiveChatComponent implements OnInit, OnDestroy {

  messages$ = this.service.messages$;
  active = true;

  constructor(
    private service: ChatService,
    private activatedRoute: ActivatedRoute,
    private videoService: VideoService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getChatId()
      .pipe(takeWhile(() => this.active))
      .subscribe(chatId => {
        this.service.stopPoll();
        this.service.pollMessages(chatId);
      });
  }

  navigateToAuthorChat(author: any) {
    this.router.navigate([{ outlets: { chat: ['author', author.id] } }], { relativeTo: this.activatedRoute.parent });
  }

  sendMessage(text: string) {
    if (text.length) {
      this.getChatId().pipe(take(1))
        .subscribe(chatId => {
          this.service.sendMessage(chatId, text);
        });
    }
  }

  private getChatId() {
    return this.videoService.video$
      .pipe(
        filter(video => !!video),
        map(video => video.chatId)
      );
  }

  ngOnDestroy() {
    this.active = false;
    this.service.stopPoll();
  }

}
