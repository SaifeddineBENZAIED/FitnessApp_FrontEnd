import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllWebsiteReviewsComponent } from './all-website-reviews.component';

describe('AllWebsiteReviewsComponent', () => {
  let component: AllWebsiteReviewsComponent;
  let fixture: ComponentFixture<AllWebsiteReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllWebsiteReviewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllWebsiteReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
