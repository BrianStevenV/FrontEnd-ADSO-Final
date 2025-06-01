export interface OrderItem {
    productId: number;
    quantity: number;
    unitPrice: number;
    itemTotal: number;
}

export interface Order {
    orderId: number;
    userId: number;
    status: string;
    total: number;
    items: OrderItem[];
}