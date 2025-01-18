import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardReviewComponent } from './dashboard-review.component';

describe('DashboardReviewComponent', () => {
  let component: DashboardReviewComponent;
  let fixture: ComponentFixture<DashboardReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardReviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
