import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private apiUrl = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) {}

  updateUserProfile(data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}user/update/`, data);
  }

  getUserProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}user/`);
  }

  requestPasswordReset(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}password-reset/`, { email });
  }

  validateResetLink(uid: string, token: string): Observable<any> {
    const url = `${this.apiUrl}password-reset-confirm/${uid}/${token}/`;
    return this.http.get(url);
  }

  confirmPasswordReset(uid: string, token: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}password-reset-confirm/${uid}/${token}/`, {
      new_password1: newPassword,
      new_password2: newPassword,
    });
  }

  changePassword(oldPassword: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}password-change/`, {
      old_password: oldPassword,
      new_password1: newPassword,
      new_password2: newPassword,
    });
  }
}
