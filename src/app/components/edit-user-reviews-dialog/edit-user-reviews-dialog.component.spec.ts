import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserReviewsDialogComponent } from './edit-user-reviews-dialog.component';

describe('EditUserReviewsDialogComponent', () => {
  let component: EditUserReviewsDialogComponent;
  let fixture: ComponentFixture<EditUserReviewsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditUserReviewsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditUserReviewsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
