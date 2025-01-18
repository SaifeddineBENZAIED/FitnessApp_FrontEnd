import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RecommandationService } from '../../services/recommandation/recommandation.service';
import { AuthService } from '../../services/authentication/auth.service';
import { ExerciseDetailDialogComponent } from '../exercise-detail-dialog/exercise-detail-dialog.component';
import { ExercisesService } from '../../services/exercises/exercises.service';
import { ExerciseRecommendation } from '../../models/exercise-recommendation';
import { ExerciseRecommendationResponse } from '../../models/exercise-recommendation-response';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-exercises-recommandation',
  templateUrl: './exercises-recommandation.component.html',
  styleUrl: './exercises-recommandation.component.scss'
})
export class ExercisesRecommandationComponent implements OnInit {
  userPreferences: any = {};
  recommendedExercises: ExerciseRecommendation[] = [];

  constructor(
    private recommendationService: RecommandationService,
    private authService: AuthService,
    public dialog: MatDialog,
    private exerciseService: ExercisesService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.fetchUserInfo();
  }

  fetchUserInfo(): void {
    this.authService.getUserInfo().subscribe(userInfo => {
      this.userPreferences = {
        age: userInfo.age,
        height_cm: userInfo.height,
        weight_kg: userInfo.weight,
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
  
  getRecommendations(): void {
    this.recommendationService.getRecommendedExercises(this.userPreferences)
      .subscribe({
        next: (data: ExerciseRecommendationResponse) => {
          this.recommendedExercises = data.recommendations;
        }, error: () => {
          this.snackBar.open('Error fetching exercise', 'Close', { duration: 3000 });
        }
      });
  }

  openDialog(exercise: ExerciseRecommendation): void {
    this.exerciseService.getExerciseByName(exercise.name).subscribe(data => {
      const dialogRef = this.dialog.open(ExerciseDetailDialogComponent, {
        width: '700px',
        data: data
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    });
  }
}
