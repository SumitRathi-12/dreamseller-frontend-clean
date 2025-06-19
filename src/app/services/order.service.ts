// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
//
// @Injectable({
//   providedIn: 'root'
// })
// export class OrderService {
//   private readonly apiUrl = 'http://localhost:8080/api/orders'; // Updated path if needed
//
//   constructor(private http: HttpClient) {}
//
//   getOrders(): Observable<any[]> {
//     return this.http.get<any[]>(this.apiUrl);
//   }
//
//   addOrder(order: any): Observable<any> {
//     return this.http.post<any>(this.apiUrl, order);
//   }
// }
// order.service.ts

// src/app/services/order.service.ts

// src/app/services/order.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';  // Adjust path if necessary

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = 'http://localhost:8080/api/orders'; // URL to your backend API

  constructor(private http: HttpClient) { }

  // Method to get all orders
  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }

  // NEW: Method to create an order (POST request)
  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, order);
  }
}

