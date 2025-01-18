import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExercisesRecommandationComponent } from './exercises-recommandation.component';

describe('ExercisesRecommandationComponent', () => {
  let component: ExercisesRecommandationComponent;
  let fixture: ComponentFixture<ExercisesRecommandationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExercisesRecommandationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExercisesRecommandationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
