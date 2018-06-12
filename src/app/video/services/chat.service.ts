import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';

@Injectable()
export class ChatService {

  private nextPageToken = '';
  private messagesSource$ = new BehaviorSubject([]);
  private timeout: number;

  messages$ = this.messagesSource$.asObservable();

  constructor(private http: HttpClient) {}

  pollMessages(chatId: string) {
    const params: any = { };
    if (this.nextPageToken) {
      params.nextPageToken = this.nextPageToken;
    }
    this.http.get(`/api/chat/${chatId}`, { params })
      .subscribe((response: any) => {
        this.nextPageToken = response.nextPageToken;
        this.messagesSource$.next([
          ...this.messagesSource$.getValue(),
          ...response.items
        ]);
        this.timeout = setTimeout(this.pollMessages.bind(this, chatId), response.pollingIntervalMillis);
      });
  }

  stopPoll() {
    clearTimeout(this.timeout);
    this.nextPageToken = '';
    this.messagesSource$.next([]);
  }

  isPolling() {
    return typeof this.timeout === 'number';
  }

  getMessagesByAuthor(chatId: string, authorId: string) {
    return this.http.get(`/api/chat/${chatId}/author/${authorId}`);
  }

  sendMessage(chatId: string, text: string) {
    this.http.post(`/api/chat/${chatId}`, { text }).subscribe(res => console.log(res));
  }

}