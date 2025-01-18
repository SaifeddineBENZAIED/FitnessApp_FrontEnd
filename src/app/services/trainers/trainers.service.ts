import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainersService {

  private apiUrl = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) { }

  getTrainers(page: number, filter: any): Observable<any> {
    let params = new HttpParams();
    params = params.append('page', page.toString());
    if (filter.first_name) {
      params = params.append('first_name', filter.first_name);
    }
    if (filter.last_name) {
      params = params.append('last_name', filter.last_name);
    }
    if (filter.specialty) {
      params = params.append('specialty', filter.specialty);
    }
    if (filter.min_experience) {
      params = params.append('min_experience', filter.min_experience);
    }
    if (filter.max_experience) {
      params = params.append('max_experience', filter.max_experience);
    }
    if (filter.min_rating) {
      params = params.append('min_rating', filter.min_rating);
    }
    if (filter.max_rating) {
      params = params.append('max_rating', filter.max_rating);
    }

    return this.http.get<any>(`${this.apiUrl}trainers/`, { params });
  }

  addReview(trainerId: number, reviewData: any): Observable<any> {
    // Add trainerId to reviewData before sending
    return this.http.post<any>(`${this.apiUrl}reviews/trainers`, { trainer: trainerId, ...reviewData });
  }

  getTrainerReviews(trainerId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}reviews/trainer/${trainerId}/`);
  }
  
}
