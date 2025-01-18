import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAboutComponent } from './dashboard-about.component';

describe('DashboardAboutComponent', () => {
  let component: DashboardAboutComponent;
  let fixture: ComponentFixture<DashboardAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardAboutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
