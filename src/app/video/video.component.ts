import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take, mergeMap } from 'rxjs/operators';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { VideoService } from './services/video.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
  videoUrl: SafeResourceUrl;
  video$ = this.service.video$;

  constructor(
    private service: VideoService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.params
      .pipe(take(1))
      .subscribe((params: any) => {
        this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${params.videoId}`);
        return this.service.getVideo(params.videoId);
      });
  }

}
