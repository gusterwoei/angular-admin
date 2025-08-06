import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product-service';

@Component({
  selector: 'app-product-listing-page',
  imports: [CommonModule],
  templateUrl: './product-listing-page.html',
  styleUrl: './product-listing-page.scss'
})
export class ProductListingPage {
  dropdownOpen: number | null = null;
  products: Product[] = [];

  constructor(private readonly productService: ProductService) {
    this.loadProducts();
  }

  async loadProducts() {
    this.products = await this.productService.getProducts();
  }

  toggleDropdown(productId: number) {
    this.dropdownOpen = this.dropdownOpen === productId ? null : productId;
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'active':
        return 'g-badge-active';
      case 'pending':
        return 'g-badge-pending';
      case 'inactive':
        return 'g-badge-alert';
      default:
        return 'g-badge-active';
    }
  }

  deleteProduct(productId: number) {
    this.products = this.products.filter(product => product.id !== productId);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.relative')) {
      this.dropdownOpen = null;
    }
  }
}
