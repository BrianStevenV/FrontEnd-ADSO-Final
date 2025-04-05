import { inject, Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../../../shared/services/auth/auth.service";



@Injectable({
    providedIn: 'root'
})
export class LoginGuard implements CanActivate {
    authService = inject(AuthService);
    router = inject(Router);

    canActivate(): boolean {
        if (this.authService.isLoggedIn()) {
          this.router.navigate(['/home']);
          return false;
        }
        return true;
      }
}