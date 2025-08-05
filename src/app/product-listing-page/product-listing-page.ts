import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-listing-page',
  imports: [CommonModule],
  templateUrl: './product-listing-page.html',
  styleUrl: './product-listing-page.scss'
})
export class ProductListingPage {
  dropdownOpen: number | null = null;
  products = [
    {
      id: 1,
      name: 'Wireless Headphones',
      sku: 'WH-001',
      category: 'Electronics',
      price: 129.99,
      stock: 45,
      status: 'active',
      statusText: 'Active',
      icon: 'P1'
    },
    {
      id: 2,
      name: 'Gaming Mouse',
      sku: 'GM-002',
      category: 'Electronics',
      price: 79.99,
      stock: 23,
      status: 'active',
      statusText: 'Active',
      icon: 'P2'
    },
    {
      id: 3,
      name: 'Mechanical Keyboard',
      sku: 'MK-003',
      category: 'Electronics',
      price: 159.99,
      stock: 12,
      status: 'low_stock',
      statusText: 'Low Stock',
      icon: 'P3'
    },
    {
      id: 4,
      name: 'USB-C Hub',
      sku: 'UH-004',
      category: 'Accessories',
      price: 49.99,
      stock: 67,
      status: 'active',
      statusText: 'Active',
      icon: 'P4'
    },
    {
      id: 5,
      name: 'Laptop Stand',
      sku: 'LS-005',
      category: 'Accessories',
      price: 89.99,
      stock: 34,
      status: 'active',
      statusText: 'Active',
      icon: 'P5'
    },
    {
      id: 6,
      name: 'Webcam HD',
      sku: 'WC-006',
      category: 'Electronics',
      price: 119.99,
      stock: 0,
      status: 'out_of_stock',
      statusText: 'Out of Stock',
      icon: 'P6'
    },
    {
      id: 7,
      name: 'Monitor 27"',
      sku: 'MN-007',
      category: 'Electronics',
      price: 399.99,
      stock: 18,
      status: 'active',
      statusText: 'Active',
      icon: 'P7'
    },
    {
      id: 8,
      name: 'Desk Lamp LED',
      sku: 'DL-008',
      category: 'Accessories',
      price: 59.99,
      stock: 28,
      status: 'active',
      statusText: 'Active',
      icon: 'P8'
    },
    {
      id: 9,
      name: 'Bluetooth Speaker',
      sku: 'BS-009',
      category: 'Electronics',
      price: 89.99,
      stock: 52,
      status: 'active',
      statusText: 'Active',
      icon: 'P9'
    },
    {
      id: 10,
      name: 'External SSD 1TB',
      sku: 'SSD-010',
      category: 'Storage',
      price: 199.99,
      stock: 15,
      status: 'low_stock',
      statusText: 'Low Stock',
      icon: 'P10'
    }
  ];

  toggleDropdown(productId: number) {
    this.dropdownOpen = this.dropdownOpen === productId ? null : productId;
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'active':
        return 'g-badge-active';
      case 'low_stock':
        return 'g-badge-pending';
      case 'out_of_stock':
        return 'g-badge-alert';
      default:
        return 'g-badge-active';
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.relative')) {
      this.dropdownOpen = null;
    }
  }
}
