import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateContestResultComponent } from './create-contest-result.component';

describe('CreateContestResultComponent', () => {
  let component: CreateContestResultComponent;
  let fixture: ComponentFixture<CreateContestResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateContestResultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateContestResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
