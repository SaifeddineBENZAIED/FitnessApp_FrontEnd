import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerReviewDialogComponent } from './trainer-review-dialog.component';

describe('TrainerReviewDialogComponent', () => {
  let component: TrainerReviewDialogComponent;
  let fixture: ComponentFixture<TrainerReviewDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrainerReviewDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainerReviewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
