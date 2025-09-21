import { totalmem } from "os";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderItem {
  product: Product;
  quantity: number;
}

export interface OrderForm {
  name: string;
  email: string;
  phone: string;
  address: string;
  items: CartItem[];
  total: number;
}