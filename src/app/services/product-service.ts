import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  async getProducts(): Promise<Product[]> {
    return Promise.resolve([
      {
        id: 1,
        name: 'Comprehensive Health Insurance',
        category: 'Health',
        country: 'United States',
        status: 'active'
      },
      {
        id: 2,
        name: 'Auto Insurance Premium',
        category: 'Auto',
        country: 'Canada',
        status: 'active'
      },
      {
        id: 3,
        name: 'Home Protection Plan',
        category: 'Property & Casualty',
        country: 'United Kingdom',
        status: 'pending'
      },
      {
        id: 4,
        name: 'Life Insurance Plus',
        category: 'Life',
        country: 'Australia',
        status: 'active'
      },
      {
        id: 5,
        name: 'Travel Insurance Global',
        category: 'Travel',
        country: 'Germany',
        status: 'inactive'
      },
      {
        id: 6,
        name: 'Business Liability Coverage',
        category: 'Business',
        country: 'France',
        status: 'inactive'
      },
      {
        id: 7,
        name: 'Flexi Guard',
        category: 'Property & Casualty',
        country: 'Malaysia',
        status: 'active'
      },
      {
        id: 8,
        name: 'Smart Auto Insurance',
        category: 'Auto',
        country: 'Thailand',
        status: 'pending'
      },
      {
        id: 9,
        name: 'Pet Insurance Premium',
        category: 'Pet',
        country: 'Netherlands',
        status: 'active'
      },
      {
        id: 10,
        name: 'Cyber Security Insurance',
        category: 'Business',
        country: 'Singapore',
        status: 'active'
      }
    ]);
  }
}
