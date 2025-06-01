import { Routes } from '@angular/router';
import { LayoutComponent } from './core/components/layout/layout.component';
import { LoginComponent } from './pages/login/login/login.component';
import { RegisterUserComponent } from './pages/register/register-user/register-user.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginGuard } from './core/auth/guard/login.guard';
import { UserProfileComponent } from './pages/user-profile/user-profile/user-profile.component';
import { AddProductComponent } from './pages/product/add-product/add-product.component';
import { InventoryComponent } from './pages/dashboard/inventory/inventory.component';
import { DefinitionAttributesComponent } from './pages/product/definition-attributes/definition-attributes.component';
import { DetailsProductComponent } from './pages/product/details-product/details-product.component';
import { UsersComponent } from './pages/dashboard/users/users.component';
import { CartComponent } from './pages/dashboard/cart/cart.component';
import { PaymentMethodsComponent } from './pages/dashboard/payment-methods/payment-methods.component';
import { PaymentComponent } from './pages/payment/payment/payment.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
    { path: 'register', component: RegisterUserComponent },

    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'user-profile', component: UserProfileComponent},
            { path: 'add-product', component: AddProductComponent},
            { path: 'dashboard/inventory', component: InventoryComponent},
            { path: 'definition-attribute', component: DefinitionAttributesComponent},
            { path: 'product/details/:id', component: DetailsProductComponent},
            { path: 'dashboard/admin/users', component: UsersComponent},
            { path: 'cart', component: CartComponent},
            { path: 'payment-methods', component: PaymentMethodsComponent},
            { path: 'payment', component: PaymentComponent}
        ]
    }
];

