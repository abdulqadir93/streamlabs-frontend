import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-chat-message-list',
  templateUrl: './chat-message-list.component.html',
  styleUrls: ['./chat-message-list.component.css']
})
export class ChatMessageListComponent implements OnInit {

  @Input() messages: any[] = [];
  @Output() authorClicked = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

}
