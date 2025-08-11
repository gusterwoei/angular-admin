import { Routes } from '@angular/router';
import { HomePage } from './home/home-page';
import { ProductListingPage } from './product-listing-page/product-listing-page';
import { ProductDetailPage } from './product-detail-page/product-detail-page';

export const routes: Routes = [
    { path: 'home', component: HomePage },
    { path: 'products', component: ProductListingPage },
    { path: 'products/new', component: ProductDetailPage },
    { path: 'products/:id', component: ProductDetailPage },
    { path: '**', redirectTo: 'home' }
];
