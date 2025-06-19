// src/app/models/order.model.ts

export interface Order {
    id: number;
    cancelled: boolean;
    email: string;
    purchaseDate: string;
    voucherId: number;
    // Add other fields as per your backend API
}
