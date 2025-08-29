import { Component, HostListener, ViewContainerRef, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product-service';
import { LucideAngularModule } from "lucide-angular";
import { icAdd } from '../common/icons';
import { RouterModule } from '@angular/router';
import { DialogService } from '../../lib/dialog/dialog-service';

@Component({
  selector: 'app-product-listing-page',
  imports: [CommonModule, LucideAngularModule, RouterModule],
  templateUrl: './product-listing-page.html',
  styleUrl: './product-listing-page.scss'
})
export class ProductListingPage {
  dropdownOpen: number | null = null;
  products: Product[] = [];
  icons = {
    icAdd: icAdd,
  };

  @ViewChild('deleteProductDialog')
  deleteProductDialog!: TemplateRef<any>;
  selectedProduct: Product | null = null;

  constructor(
    private readonly productService: ProductService,
    private readonly dialogService: DialogService,
    private readonly viewContainerRef: ViewContainerRef
  ) {
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

  async showDeleteDialog(productId: number) {
    this.selectedProduct = this.products.find(p => p.id === productId) || null;

    await this.dialogService.show({
      content: this.deleteProductDialog,
      buttons: [
        {
          label: 'Delete',
          action: () => this.deleteProduct(productId),
          class: 'btn-error text-white mr-3'
        },
        {
          label: 'Close',
          action: () => { }
        }
      ]
    }, this.viewContainerRef);
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
