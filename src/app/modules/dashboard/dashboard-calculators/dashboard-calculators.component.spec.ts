import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCalculatorsComponent } from './dashboard-calculators.component';

describe('DashboardCalculatorsComponent', () => {
  let component: DashboardCalculatorsComponent;
  let fixture: ComponentFixture<DashboardCalculatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardCalculatorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardCalculatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
