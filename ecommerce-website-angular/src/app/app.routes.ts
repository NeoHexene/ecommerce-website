import { Routes, RouterModule } from '@angular/router';
import { EcommerceHome } from './ecommerce-home/ecommerce-home';
import { EcommerceAdmin } from './ecommerce-admin/ecommerce-admin';
import { EcommerceUser } from './ecommerce-user/ecommerce-user';
import { EcommerceLogin } from './ecommerce-login/ecommerce-login';
import { EcommerceForbidden } from './ecommerce-forbidden/ecommerce-forbidden';
import { AuthGuard } from './_auth/auth.guard';
import { EcommerceAddNewProduct } from './ecommerce-add-new-product/ecommerce-add-new-product';
import { EcommerceShowProductDetails } from './ecommerce-show-product-details/ecommerce-show-product-details';

export const routes: Routes = [
    { path: '',  component: EcommerceHome },
    { path: 'forbidden', component: EcommerceForbidden },
    { path: 'login', component: EcommerceLogin },
    
    { path: 'user', component: EcommerceUser, canActivate: [AuthGuard], data: { roles: ['user'] } },
    
    { path: 'admin', component: EcommerceAdmin, canActivate: [AuthGuard], data: { roles: ['admin'] } },
    { path: 'add-new-product', component: EcommerceAddNewProduct, canActivate: [AuthGuard], data: { roles: ['admin'] } },
    { path: 'show-product-details', component: EcommerceShowProductDetails, canActivate: [AuthGuard], data: { roles: ['admin'] } },
    
    // { path: '**', redirectTo: '/' }
];
