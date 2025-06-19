import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class StatisticsService {
    private readonly statsUrl = 'http://localhost:8080/api/statistics'; // Adjusted path if needed

    constructor(private http: HttpClient) {}

    getStatistics(): Observable<any> {
        return this.http.get<any>(this.statsUrl);
    }
}
