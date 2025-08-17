import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { icCheck, icDelete } from '../common/icons';
import { ToastService } from '../services/toast-service';
import { ProductService } from '../services/product-service';

type Product = {
  id: number;
  name: string;
  category: string;
  country: string;
  description?: string;
  status: 'active' | 'pending' | 'inactive';
};

@Component({
  selector: 'app-product-detail-page',
  imports: [ReactiveFormsModule, RouterModule, LucideAngularModule],
  templateUrl: './product-detail-page.html',
  styleUrl: './product-detail-page.scss'
})
export class ProductDetailPage implements OnInit {
  icons = {
    icClose: icDelete,
    icCheck: icCheck,
  };
  productForm: FormGroup;
  countries: string[] = [];
  categories: { value: string; label: string }[] = [];
  statuses: { value: string; label: string }[] = [];

  constructor(
    private readonly fb: FormBuilder,
    private readonly toastService: ToastService,
    private readonly productService: ProductService,
  ) {
    this.productForm = this.fb.group({
      id: [0, Validators.required],
      name: ['', Validators.required],
      category: ['', Validators.required],
      country: ['', Validators.required],
      description: [''],
      status: ['active', Validators.required]
    });
  }

  async ngOnInit(): Promise<void> {
    this.countries = await this.productService.getCountries();
    this.categories = await this.productService.getCategories();
    this.statuses = await this.productService.getStatuses();
  }

  onSubmit() {
    if (this.productForm.valid) {
      console.log('Product Form Data:', this.productForm.value);
    }
    this.toastService.show({
      title: 'Product Saved',
      message: 'The product has been saved successfully.',
      duration: 3000
    });
  }
}
