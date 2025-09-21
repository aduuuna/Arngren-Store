
import {Product} from "./types";

export const products: Product[] = [
  {
    id: '1',
    name: 'Digital Thermometer',
    price: 25.99,
    image: '/api/placeholder/300/300',
    category: 'medical',
    description: 'Professional digital thermometer with fast readings',
    inStock: true,
  },
  {
    id: '2',
    name: 'Blood Pressure Monitor',
    price: 89.99,
    image: '/api/placeholder/300/300',
    category: 'medical',
    description: 'Automatic blood pressure monitor with large display',
    inStock: true,
  },
  {
    id: '3',
    name: 'Adjustable Wrench Set',
    price: 34.99,
    image: '/api/placeholder/300/300',
    category: 'tools',
    description: 'Professional grade adjustable wrench set',
    inStock: true,
  },
  {
    id: '4',
    name: 'Drill Bit Set',
    price: 19.99,
    image: '/api/placeholder/300/300',
    category: 'tools',
    description: 'Complete drill bit set for various materials',
    inStock: true,
  },
  {
    id: '5',
    name: 'Safety Goggles',
    price: 12.99,
    image: '/api/placeholder/300/300',
    category: 'equipment',
    description: 'Professional safety goggles with anti-fog coating',
    inStock: true,
  },
  {
    id: '6',
    name: 'Work Gloves',
    price: 8.99,
    image: '/api/placeholder/300/300',
    category: 'equipment',
    description: 'Durable work gloves with grip enhancement',
    inStock: true,
  },
];

export const categories = [
  { slug: 'medical', name: 'Medical Supplies', icon: '🏥' },
  { slug: 'tools', name: 'Tools', icon: '🔧' },
  { slug: 'equipment', name: 'Equipment', icon: '⚙️' },
];

export function getProductsByCategory(category: string) {
  return products.filter(product => product.category === category);
}

export function getProductById(id: string) {
  return products.find(product => product.id === id);
}