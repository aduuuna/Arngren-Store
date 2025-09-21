"use client";

import { Product, CartItem } from './types';
console.log('🚀 Cart.ts file loaded!');

export class CartManager {
  private static instance: CartManager;
  private items: CartItem[] = [];
  private listeners: (() => void)[] = [];
  private visitorId: string = "";

  static getInstance(): CartManager {
    if (!CartManager.instance) {
      CartManager.instance = new CartManager();
    }
    return CartManager.instance;
  }

  constructor() {
    console.log('CartManager constructor called');
    if (typeof window !== 'undefined') {
      console.log('Window is available, initializing...');
      this.initializeVisitor();
    }
  }

  private initializeVisitor(): void {
    console.log('=== INITIALIZING VISITOR ===');
    try {
      // Check if visitor ID exists in localStorage
      let existingVisitorId = localStorage.getItem('visitorId');
      console.log('Existing visitor ID from localStorage:', existingVisitorId);
      
      if (!existingVisitorId) {
        // Generate new visitor ID
        const timestamp = Date.now();
        const randomPart = Math.random().toString(36).substring(2, 15);
        existingVisitorId = `visitor_${timestamp}_${randomPart}`;
        localStorage.setItem('visitorId', existingVisitorId);
        console.log('Generated and saved new visitor ID:', existingVisitorId);
      }
      
      this.visitorId = existingVisitorId;
      console.log('Set visitorId to:', this.visitorId);
      
      this.loadCartFromStorage();
      console.log('Items loaded from storage:', this.items.length);
    } catch (error) {
      console.error('Error initializing visitor:', error);
      this.visitorId = `temp_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
      this.items = [];
    }
    console.log('=== VISITOR INITIALIZATION COMPLETE ===');
  }

  private getCartStorageKey(): string {
    const key = `cart_${this.visitorId}`;
    console.log('Storage key:', key);
    return key;
  }

  private loadCartFromStorage(): void {
    if (!this.visitorId) {
      console.log('No visitor ID, skipping load');
      return;
    }
    
    try {
      const storageKey = this.getCartStorageKey();
      const storedCart = localStorage.getItem(storageKey);
      console.log('Loading from storage key:', storageKey);
      console.log('Stored cart data:', storedCart);
      
      if (storedCart) {
        this.items = JSON.parse(storedCart);
        console.log('Loaded items:', this.items);
      }
    } catch (error) {
      console.error('Error loading cart from storage:', error);
      this.items = [];
    }
  }

  private saveCartToStorage(): void {
    if (!this.visitorId || typeof window === 'undefined') {
      console.log('Cannot save - no visitor ID or no window');
      return;
    }
    
    try {
      const storageKey = this.getCartStorageKey();
      const dataToSave = JSON.stringify(this.items);
      localStorage.setItem(storageKey, dataToSave);
      console.log('Saved to storage:', storageKey, dataToSave);
    } catch (error) {
      console.error('Error saving cart to storage:', error);
    }
  }

  addItem(product: Product): void {
    console.log('=== ADDING ITEM ===');
    console.log('Product:', product.name);
    console.log('Current visitor ID:', this.visitorId);
    console.log('Current items count:', this.items.length);

    const existingItem = this.items.find(item => item.product.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
      console.log('Updated existing item quantity to:', existingItem.quantity);
    } else {
      this.items.push({ product, quantity: 1 });
      console.log('Added new item, total items now:', this.items.length);
    }
    
    this.saveCartToStorage();
    this.notifyListeners();
    console.log('=== ITEM ADDED ===');
  }

  removeItem(productId: string): void {
    console.log('Removing item:', productId);
    this.items = this.items.filter(item => item.product.id !== productId);
    this.saveCartToStorage();
    this.notifyListeners();
  }

  updateQuantity(productId: string, quantity: number): void {
    console.log('Updating quantity for:', productId, 'to:', quantity);
    const item = this.items.find(item => item.product.id === productId);
    if (item) {
      item.quantity = quantity;
      if (item.quantity <= 0) {
        this.removeItem(productId);
      } else {
        this.saveCartToStorage();
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
    const count = this.items.reduce((count, item) => count + item.quantity, 0);
    console.log('Current item count:', count);
    return count;
  }

  clearCart(): void {
    console.log('Clearing cart');
    this.items = [];
    this.saveCartToStorage();
    this.notifyListeners();
  }

  getVisitorId(): string {
    return this.visitorId;
  }

  subscribe(listener: () => void): () => void {
    console.log('Adding listener, total listeners:', this.listeners.length + 1);
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners(): void {
    console.log('Notifying', this.listeners.length, 'listeners');
    this.listeners.forEach(listener => {
      try {
        listener();
      } catch (error) {
        console.error('Error in cart listener:', error);
      }
    });
  }
}