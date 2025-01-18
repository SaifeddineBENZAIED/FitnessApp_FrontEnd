import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, firstValueFrom, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8000/api/'; // Adjust the URL as per your backend
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();
  private userImageSubject: BehaviorSubject<string> = new BehaviorSubject<string>('assets/fitness-icon.jpg');
  public userImage$: Observable<string> = this.userImageSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')!));
    this.currentUser = this.currentUserSubject.asObservable();
    this.checkLoginStatus();
  }

  // This function should be updated to actually check the user's login status
  checkLoginStatus(): void {
    const user = localStorage.getItem('currentUser'); // Example check, replace with real logic
    if (user) {
      this.isLoggedInSubject.next(true);
      this.userImageSubject.next(JSON.parse(user).profile_image_url || 'assets/fitness-icon.jpg');
    } else {
      this.isLoggedInSubject.next(false);
    }
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}login/`, { 'email': email, 'password': password })
      .pipe(map(user => {
        // store user details and jwt token in local storage
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        this.getUserImg();
        return user;
      }));
  }
  

  logout(): void {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.isLoggedInSubject.next(false);
    this.userImageSubject.next('assets/fitness-icon.jpg');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!this.currentUserValue;
  }

  getAccessToken(): string | null {
    const currentUser = this.currentUserValue;
    return currentUser ? currentUser.access : null;
  }

  getRefreshToken(): string | null {
    const currentUser = this.currentUserValue;
    return currentUser ? currentUser.refresh : null;
  }

  refreshToken(): Observable<any> {
    const refreshToken = this.getRefreshToken();
    return this.http.post<any>(`${this.apiUrl}token/refresh/`, { refresh: refreshToken })
      .pipe(map(token => {
        // Store user details and jwt token in local storage
        localStorage.setItem('currentUser', JSON.stringify(token));
        this.currentUserSubject.next(token);
        return token;
      }));
  }

  register(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}register/`, userData);
  }

  getUserInfo(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}user/`);
  }

  getUserImg() {
    this.http.get<any>(`${this.apiUrl}user/`).subscribe(
      (user) => {
        this.isLoggedInSubject.next(true);
        this.userImageSubject.next(user.profile_image_url || 'assets/fitness-icon.jpg');
      }
    );
  }
  
  async fetchCsrfToken() {
    const response = await firstValueFrom(this.http.get<any>(`${this.apiUrl}csrf-token/`, { withCredentials: true }));
    localStorage.setItem('csrf_token', response.csrfToken);
  }
  
  getCsrfToken() {
    return localStorage.getItem('csrf_token') as string;
  }

}
