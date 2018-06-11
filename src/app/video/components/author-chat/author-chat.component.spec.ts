import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorChatComponent } from './author-chat.component';

describe('AuthorChatComponent', () => {
  let component: AuthorChatComponent;
  let fixture: ComponentFixture<AuthorChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
