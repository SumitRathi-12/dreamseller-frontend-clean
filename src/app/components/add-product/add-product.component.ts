// import { Component } from '@angular/core';
// import { OrderService } from '../../services/order.service';
// import { Router } from '@angular/router';
//
// @Component({
//   selector: 'app-add-product',
//   templateUrl: './add-product.component.html',
//   styleUrls: ['./add-product.component.css']
// })
// export class AddProductComponent {
//   product = {
//     name: '',
//     price: 0,
//     quantity: 0
//   };
//
//   constructor(private orderService: OrderService, private router: Router) {}
//
//   addProduct() {
//     this.orderService.addOrder(this.product).subscribe(
//         (response) => {
//           console.log('Product added:', response);
//           this.router.navigate(['/orders']);
//         },
//         (error) => {
//           console.error('Error adding product:', error);
//         }
//     );
//   }
// }
// src/app/components/add-product/add-product.component.ts

/*
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';  // Import the OrderService
import { Order } from '../../models/order.model';  // Import the Order model

@Component({
    selector: 'app-add-product',
    templateUrl: './add-product.component.html',
    styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

    // Define the product as an order object
    product: Order = {
        id: 0,  // Default value (auto-increment in the backend)
        cancelled: false,  // Default value
        email: '',  // User's email (input value)
        purchaseDate: '',  // Date of purchase (input value)
        voucherId: 0,  // Voucher ID associated with the order
    };

    constructor(private orderService: OrderService) { }

    ngOnInit(): void {
        // Initialization logic (if any)
    }

    // Method to handle order submission
    addProduct(): void {
        // Make sure you are using the correct method name from OrderService
        this.orderService.createOrder(this.product).subscribe(
            (response) => {
                console.log('Order added successfully:', response);
                // Optionally, reset form or show success message
            },
            (error) => {
                console.error('Error adding order:', error);
            }
        );
    }
}
*/

import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
    selector: 'app-add-product',
    templateUrl: './add-product.component.html',
    styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
    product: Order = {
        id: 0,
        cancelled: false,
        email: '',
        purchaseDate: '',
        voucherId: 0
    };

    submittedOrder: Order | null = null;
    jsonLdScript: SafeHtml | null = null;

    constructor(private orderService: OrderService, private sanitizer: DomSanitizer) { }

    ngOnInit(): void { }

    addProduct(): void {
        this.orderService.createOrder(this.product).subscribe(
            (response) => {
                console.log('Order added successfully:', response);
                this.submittedOrder = { ...this.product };

                const jsonLd = {
                    "@context": "https://schema.org",
                    "@type": "Order",
                    "orderDate": this.submittedOrder.purchaseDate,
                    "confirmationNumber": this.submittedOrder.voucherId,
                    "customer": {
                        "@type": "Person",
                        "email": this.submittedOrder.email
                    }
                };

                this.jsonLdScript = this.sanitizer.bypassSecurityTrustHtml(
                    `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`
                );

                this.product = {
                    id: 0,
                    cancelled: false,
                    email: '',
                    purchaseDate: '',
                    voucherId: 0
                };
            },
            (error) => {
                console.error('Error adding order:', error);
            }
        );
    }
}


