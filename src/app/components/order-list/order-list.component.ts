// import { Component, OnInit } from '@angular/core';
// import { OrderService } from '../../services/order.service';
//
// @Component({
//     selector: 'app-order-list',
//     templateUrl: './order-list.component.html',
//     styleUrls: ['./order-list.component.css']
// })
// export class OrderListComponent implements OnInit {
//     orders: any[] = [];
//
//     constructor(private orderService: OrderService) {}
//
//     ngOnInit(): void {
//         this.fetchOrders();
//     }
//
//     fetchOrders() {
//         this.orderService.getOrders().subscribe(
//             (data) => {
//                 this.orders = data;
//             },
//             (error) => {
//                 console.error('Error fetching orders:', error);
//             }
//         );
//     }
// }

// src/app/components/order-list/order-list.component.ts
/*

import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';  // Import the OrderService
import { Order } from '../../models/order.model';  // Import the Order model

@Component({
    selector: 'app-order-list',
    templateUrl: './order-list.component.html',
    styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
    orders: Order[] = [];  // Array to store orders
    newOrder: Order = {
        id: 0, // Default value (auto-increment in backend)
        cancelled: false,
        email: '',
        purchaseDate: '',
        voucherId: 0,
    };

    constructor(private orderService: OrderService) {}

    ngOnInit(): void {
        this.fetchOrders();
    }

    // Fetch existing orders
    fetchOrders(): void {
        this.orderService.getOrders().subscribe(
            (data) => {
                this.orders = data;
            },
            (error) => {
                console.error('Error fetching orders:', error);
            }
        );
    }

    // Handle creating a new order
    createOrder(): void {
        this.orderService.createOrder(this.newOrder).subscribe(
            (response) => {
                console.log('Order created successfully:', response);
                this.orders.push(response);  // Add the new order to the orders list
                this.resetForm();  // Optionally, reset the form
            },
            (error) => {
                console.error('Error creating order:', error);
            }
        );
    }

    // Reset form fields
    resetForm(): void {
        this.newOrder = {
            id: 0,
            cancelled: false,
            email: '',
            purchaseDate: '',
            voucherId: 0,
        };
    }
}
*/

import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
    selector: 'app-order-list',
    templateUrl: './order-list.component.html',
    styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
    orders: Order[] = [];
    newOrder: Order = {
        id: 0,
        cancelled: false,
        email: '',
        purchaseDate: '',
        voucherId: 0,
    };
    jsonLdScript: SafeHtml | null = null;

    constructor(private orderService: OrderService, private sanitizer: DomSanitizer) {}

    ngOnInit(): void {
        this.fetchOrders();
    }

    fetchOrders(): void {
        this.orderService.getOrders().subscribe(
            (data) => {
                this.orders = data;
                this.generateJsonLd();
            },
            (error) => {
                console.error('Error fetching orders:', error);
            }
        );
    }

    createOrder(): void {
        this.orderService.createOrder(this.newOrder).subscribe(
            (response) => {
                console.log('Order created successfully:', response);
                this.orders.push(response);
                this.generateJsonLd(); // Refresh JSON-LD data
                this.resetForm();
            },
            (error) => {
                console.error('Error creating order:', error);
            }
        );
    }

    resetForm(): void {
        this.newOrder = {
            id: 0,
            cancelled: false,
            email: '',
            purchaseDate: '',
            voucherId: 0,
        };
    }

    generateJsonLd(): void {
        const ordersLd = this.orders.map(order => ({
            "@type": "Order",
            "orderDate": order.purchaseDate,
            "confirmationNumber": order.voucherId,
            "customer": {
                "@type": "Person",
                "email": order.email
            }
        }));

        const jsonLd = {
            "@context": "https://schema.org",
            "@graph": ordersLd
        };

        this.jsonLdScript = this.sanitizer.bypassSecurityTrustHtml(
            `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`
        );
    }
}

