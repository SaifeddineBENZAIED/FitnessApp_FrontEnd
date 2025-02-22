import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MusclesService {

  private apiUrl = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) { }

  getMuscles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}muscle-groups/`);
  }

}
