"use client";

import { Product, CartItem } from './types';

export class CartManager {
  private static instance: CartManager;
  private items: CartItem[] = [];
  private listeners: (() => void)[] = [];

  static getInstance(): CartManager {
    if (!CartManager.instance) {
      CartManager.instance = new CartManager();
    }
    return CartManager.instance;
  }

  addItem(product: Product): void {
    const existingItem = this.items.find(item => item.product.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.items.push({ product, quantity: 1 });
    }
    
    this.notifyListeners();
  }

  removeItem(productId: string): void {
    this.items = this.items.filter(item => item.product.id !== productId);
    this.notifyListeners();
  }

  updateQuantity(productId: string, quantity: number): void {
    const item = this.items.find(item => item.product.id === productId);
    if (item) {
      item.quantity = quantity;
      if (item.quantity <= 0) {
        this.removeItem(productId);
      } else {
        this.notifyListeners();
      }
    }
  }

  getItems(): CartItem[] {
    return [...this.items];
  }

  getTotal(): number {
    return this.items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }

  getItemCount(): number {
    return this.items.reduce((count, item) => count + item.quantity, 0);
  }

  clearCart(): void {
    this.items = [];
    this.notifyListeners();
  }

  subscribe(listener: () => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener());
  }
}