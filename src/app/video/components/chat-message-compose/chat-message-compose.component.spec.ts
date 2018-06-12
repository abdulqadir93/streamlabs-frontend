import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatMessageComposeComponent } from './chat-message-compose.component';

describe('ChatMessageComposeComponent', () => {
  let component: ChatMessageComposeComponent;
  let fixture: ComponentFixture<ChatMessageComposeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatMessageComposeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatMessageComposeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
