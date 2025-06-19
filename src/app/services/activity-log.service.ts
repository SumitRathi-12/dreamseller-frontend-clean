import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivityLogService {
  private readonly apiUrl = 'http://localhost:8080/api/activity-log'; // Change if your backend URL differs

  constructor(private http: HttpClient) {}

  getLogs(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
