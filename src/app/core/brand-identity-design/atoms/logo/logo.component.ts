import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [],
  template: `<p class="logo" (click)="goToHome()">Pour Maryam</p>`,
  styleUrl: './logo.component.scss'
})
export class LogoComponent {
  
  router = inject(Router);

  goToHome(){
    this.router.navigate(['/home']);
  }
}
