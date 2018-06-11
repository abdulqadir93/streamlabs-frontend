import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class VideoService {
  constructor(private http: HttpClient) { }

  private videoSource$ = new BehaviorSubject(null);
  video$ = this.videoSource$.asObservable();

  getVideo(videoId: string) {
    return this.http.get(`/api/videos/${videoId}`)
      .subscribe(video => this.videoSource$.next(video));
  }

}