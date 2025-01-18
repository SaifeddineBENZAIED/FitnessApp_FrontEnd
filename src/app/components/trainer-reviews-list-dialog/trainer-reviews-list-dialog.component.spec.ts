import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerReviewsListDialogComponent } from './trainer-reviews-list-dialog.component';

describe('TrainerReviewsListDialogComponent', () => {
  let component: TrainerReviewsListDialogComponent;
  let fixture: ComponentFixture<TrainerReviewsListDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrainerReviewsListDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainerReviewsListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
