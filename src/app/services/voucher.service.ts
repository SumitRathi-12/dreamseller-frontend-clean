import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoucherService {
  private apiUrl = 'http://localhost:8080/api/vouchers'; // Update URL if needed

  constructor(private http: HttpClient) {}

  getVouchers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Add new voucher
  addVoucher(voucher: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, voucher);
  }
}
