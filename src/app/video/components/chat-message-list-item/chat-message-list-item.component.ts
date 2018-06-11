import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-chat-message-list-item',
  templateUrl: './chat-message-list-item.component.html',
  styleUrls: ['./chat-message-list-item.component.css']
})
export class ChatMessageListItemComponent implements OnInit {

  @Input() message: any;
  @Output() authorClicked = new EventEmitter<any>();
  
  constructor() { }

  ngOnInit() {
  }

}
