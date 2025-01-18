import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExerciseRecommendationResponse } from '../../models/exercise-recommendation-response';
import { MealsRecommendationResponse } from '../../models/meals-recommendation-response';

@Injectable({
  providedIn: 'root'
})
export class RecommandationService {

  private apiUrl = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) { }

  getRecommendedExercises(userData: any): Observable<ExerciseRecommendationResponse> {
    return this.http.post<ExerciseRecommendationResponse>(`${this.apiUrl}workout-recommendations/`, userData);
  }

  getRecommendedMeals(userData: any): Observable<MealsRecommendationResponse> {
    return this.http.post<MealsRecommendationResponse>(`${this.apiUrl}meal-recommendations/`, userData);
  }

  getMealsByName(meal: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}nutrition-recommendation/${encodeURIComponent(meal)}/`);
  }
}
