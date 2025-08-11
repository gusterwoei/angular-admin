import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

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
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './product-detail-page.html',
  styleUrl: './product-detail-page.scss'
})
export class ProductDetailPage {
  productForm: FormGroup;
  countries = [
    'United States',
    'Canada',
    'United Kingdom',
    'Germany',
    'France',
    'Japan',
    'Australia'
  ];
  categories = [
    { value: 'life', label: 'Life' },
    { value: 'health', label: 'Health' },
    { value: 'auto', label: 'Auto' },
    { value: 'home', label: 'Home' },
    { value: 'travel', label: 'Travel' },
    { value: 'pnc', label: 'Property and Casualty' }
  ];

  statuses = [
    { value: 'active', label: 'Active' },
    { value: 'pending', label: 'Pending' },
    { value: 'inactive', label: 'Inactive' }
  ];

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      id: [0, Validators.required],
      name: ['', Validators.required],
      category: ['', Validators.required],
      country: ['', Validators.required],
      description: [''],
      status: ['active', Validators.required]
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      console.log('Product Form Data:', this.productForm.value);
    }
  }
}
