import { Routes } from '@angular/router';
import { LayoutComponent } from './core/components/layout/layout.component';
import { LoginComponent } from './pages/login/login/login.component';
import { RegisterUserComponent } from './pages/register/register-user/register-user.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginGuard } from './core/auth/guard/login.guard';
import { UserProfileComponent } from './pages/user-profile/user-profile/user-profile.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
    { path: 'register', component: RegisterUserComponent },

    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'user-profile', component: UserProfileComponent}
        ]
    }
];

