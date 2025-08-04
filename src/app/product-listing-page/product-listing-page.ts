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

  toggleDropdown(productId: number) {
    this.dropdownOpen = this.dropdownOpen === productId ? null : productId;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.relative')) {
      this.dropdownOpen = null;
    }
  }
}
