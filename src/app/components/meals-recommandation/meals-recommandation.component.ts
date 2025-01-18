import { Component, OnInit } from '@angular/core';
import { RecommandationService } from '../../services/recommandation/recommandation.service';
import { AuthService } from '../../services/authentication/auth.service';
import { MealsRecommendation } from '../../models/meals-recommendation';
import { forkJoin } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-meals-recommandation',
  templateUrl: './meals-recommandation.component.html',
  styleUrl: './meals-recommandation.component.scss'
})
export class MealsRecommandationComponent implements OnInit {
  userPreferences: any = {};
  recommendedMeals: any[] = [];

  constructor(private mealRecommendationService: RecommandationService, private authService: AuthService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.fetchUserInfo();
  }

  fetchUserInfo(): void {
    this.authService.getUserInfo().subscribe(userInfo => {
      this.userPreferences = {
        age_range: this.getAgeRange(userInfo.age),
        gender: userInfo.gender,
        fitness_goal: userInfo.fitness_goal,
        activity_level: userInfo.activity_level,
        dietary_preferences: userInfo.dietary_preferences,
        medical_conditions: userInfo.medical_conditions,
        experience_level: userInfo.experience_level
      };
      this.getRecommendations();
    });
  }

  getAgeRange(age: number): string {
    if (age >= 18 && age <= 30) return '18-30';
    if (age >= 31 && age <= 40) return '31-40';
    if (age >= 41 && age <= 50) return '41-50';
    if (age >= 51 && age <= 60) return '51-60';
    if (age >= 61 && age <= 70) return '61-70';
    return '70+';
  }

  getRecommendations(): void {
    this.mealRecommendationService.getRecommendedMeals(this.userPreferences).subscribe(data => {
      this.getMeals(data.recommendations);
    });
  }

  getMeals(recommendations: any): void {
    if (!recommendations || recommendations.length === 0) {
      this.snackBar.open('No recommendations found', 'Close', { duration: 3000 });
      console.error('No recommendations found.');
      return;
    }
    this.recommendedMeals = []; // Reset recommended meals
    recommendations.forEach((item: { meal: string; }) => {
      this.mealRecommendationService.getMealsByName(item.meal).subscribe({
        next: (data => {
          this.recommendedMeals.push(data);
        }), error: (err) => {
          this.snackBar.open('Error fetching meal', 'Close', { duration: 3000 });
          console.error('Error fetching meal:', item.meal, err);
        } 
      });
    });
  }

}
