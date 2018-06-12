import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-chat-message-compose',
  templateUrl: './chat-message-compose.component.html',
  styleUrls: ['./chat-message-compose.component.css']
})
export class ChatMessageComposeComponent implements OnInit {

  @Output() send = new EventEmitter<string>();

  user = this.authService.getUser();

  constructor(private authService: AuthService) { }

  ngOnInit() { }

  emit(input: HTMLInputElement) {
    this.send.emit(input.value);
    input.value = '';
  }

}
