import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from '../../services/chat.service';
import { mergeMap, map, filter, switchMap } from 'rxjs/operators';
import { VideoService } from '../../services/video.service';

@Component({
  selector: 'app-author-chat',
  templateUrl: './author-chat.component.html',
  styleUrls: ['./author-chat.component.css']
})
export class AuthorChatComponent implements OnInit {

  messages = [];
  authorDetails: any = { };

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: ChatService,
    private videoService: VideoService,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.params
      .pipe(
        switchMap((params: any) => {
          this.authorDetails.id = params.authorId;
          return this.videoService.video$
            .pipe(
              filter(video => !!video),
              map((video: any) => ({ video, params }))
            );
        }),
        mergeMap(data => {
          return this.service.getMessagesByAuthor(data.video.chatId, data.params.authorId);
        })
      ).subscribe((messages: any[]) => {
        this.messages = messages;
        if (this.messages.length) {
          this.authorDetails = this.messages[0].author;
        }
      });
  }

  navigateToLiveChat() {
    this.router.navigate(['.'], { relativeTo: this.activatedRoute.parent });
  }

}
