import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExercisesService {

  private apiUrl = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) { }

  getExercises(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}exercises/`);
  }

  getExercisesByMuscleGroup(muscleGroup: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}exercises/muscle-group/${muscleGroup}/`);
  }

  getExerciseByName(name: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}exercises/name/${name}/`);
  }

}
