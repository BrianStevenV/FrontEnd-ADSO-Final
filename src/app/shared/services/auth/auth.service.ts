import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { LOCAL_STORAGE_TOKEN_AUTH_NAME, Login, TokenResponse } from '../../models/auth.model';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  http = inject(HttpClient);
  router = inject(Router);

  private readonly URL = `${environment.user_base_path}${environment.auth_controller}${environment.auth_post_login}`;
  private tokenSignal = signal<string | null>(
    typeof window !== 'undefined' ? localStorage.getItem(LOCAL_STORAGE_TOKEN_AUTH_NAME) : null
  );
  

  token(): string | null {
    return this.tokenSignal();
  }

  private tokenPayload = computed(() => {
    const tokenValue = this.tokenSignal();
    return tokenValue ? this.decodeToken(tokenValue) : null;
  })

  role = computed(() => this.tokenPayload()?.roles ?? [])
  userId = computed(() => this.tokenPayload()?.id ?? null)
  
  logIn(login: Login): Observable<TokenResponse>{
    return this.http.post<TokenResponse>(`${this.URL}`, login).pipe(
      tap((res) => {
        console.log("res from login" + res);
        console.log("res token from login" + res.token);
        if(res.token){
          localStorage.setItem(LOCAL_STORAGE_TOKEN_AUTH_NAME, res.token);
          this.tokenSignal.set(res.token);
        }
      })
    )
  }
  
  logOut(): void {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_AUTH_NAME);
    this.tokenSignal.set(null);
    this.router.navigateByUrl('/');
  }
  
  isLoggedIn(): boolean {
    const token = this.tokenSignal();
    if (!token) return false;
    
    try {
      const payload = this.decodeToken(token);
      const now = Math.floor(Date.now() / 1000);
      if (now > payload.exp) {
        this.logOut();
        return false;
      }
      return true;
    } catch {
      this.logOut();
      return false;
    }
  }

  getRole(): string | null {
    return this.role().length > 0 ? this.role()[0] : null;
  }
  private decodeToken(token: string): any {
    const payloadToken = token.split('.')[1];
    return JSON.parse(atob(payloadToken));
  }

  // Añade este método a AuthService
isRunningInBrowser(): boolean {
  return typeof window !== 'undefined';
}

// Y un método seguro para obtener del localStorage
safeGetFromLocalStorage(key: string): string | null {
  if (this.isRunningInBrowser()) {
    return localStorage.getItem(key);
  }
  return null;
}

  public static createAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_AUTH_NAME);
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }
}
