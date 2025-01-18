import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseDetailDialogComponent } from './exercise-detail-dialog.component';

describe('ExerciseDetailDialogComponent', () => {
  let component: ExerciseDetailDialogComponent;
  let fixture: ComponentFixture<ExerciseDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExerciseDetailDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExerciseDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
