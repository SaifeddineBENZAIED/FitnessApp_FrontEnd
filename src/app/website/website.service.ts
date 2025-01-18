import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsiteService {

  private baseUrl = 'http://localhost:8000/api/reviews/website';

  constructor(private http: HttpClient) {}

  getUserReview(): Observable<any> {
    return this.http.get(`${this.baseUrl}/list`);
  }

  addReview(review: any): Observable<any> {
    return this.http.post(this.baseUrl, review);
  }

  editReview(reviewId: number, review: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/edit/${reviewId}/`, review);
  }

  getAllReviews(): Observable<any> {
    return this.http.get(`${this.baseUrl}/list/all`);
  }

}
