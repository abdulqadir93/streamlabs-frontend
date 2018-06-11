import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatMessageListItemComponent } from './chat-message-list-item.component';

describe('ChatMessageListItemComponent', () => {
  let component: ChatMessageListItemComponent;
  let fixture: ComponentFixture<ChatMessageListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatMessageListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatMessageListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
