import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealsRecommandationComponent } from './meals-recommandation.component';

describe('MealsRecommandationComponent', () => {
  let component: MealsRecommandationComponent;
  let fixture: ComponentFixture<MealsRecommandationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MealsRecommandationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MealsRecommandationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
