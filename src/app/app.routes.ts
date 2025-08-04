import { Routes } from '@angular/router';
import { HomePage } from './home/home-page';
import { ProductListingPage } from './product-listing-page/product-listing-page';

export const routes: Routes = [
    { path: 'home', component: HomePage },
    { path: 'products', component: ProductListingPage },
    { path: '**', redirectTo: 'home' }
];
