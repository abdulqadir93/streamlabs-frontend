import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { VideoService } from '../../services/video.service';
import { filter, takeWhile } from 'rxjs/operators';
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
    this.service.stopPoll();
    this.videoService.video$
      .pipe(
        takeWhile(() => this.active),
        filter(video => !!video),
      )
      .subscribe((video: any) => {
        this.service.pollMessages(video.chatId);
      });
  }

  navigateToAuthorChat(author: any) {
    this.router.navigate([{ outlets: { chat: ['author', author.id] } }], { relativeTo: this.activatedRoute.parent });
  }

  ngOnDestroy() {
    this.active = false;
    this.service.stopPoll();
  }

}
