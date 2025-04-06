import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginParticipantComponent } from './login-participant.component';

describe('LoginParticipantComponent', () => {
  let component: LoginParticipantComponent;
  let fixture: ComponentFixture<LoginParticipantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginParticipantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginParticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
