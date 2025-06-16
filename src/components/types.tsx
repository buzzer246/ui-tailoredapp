// types.ts
export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  phoneNumber: string;
  products: OrderProduct[];
  stitchingCost: number;
  createdAt: string;
}

export interface OrderProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
}