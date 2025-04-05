import { Component, inject } from '@angular/core';
import { LogoComponent } from "../../brand-identity-design/atoms/logo/logo.component";
import { NavbarComponent } from "../../brand-identity-design/organism/navbar/navbar.component";
import { Router } from '@angular/router';
import { SearchComponent } from "../../brand-identity-design/atoms/search/search.component";
import { NavbarPaths } from '../../../shared/types/navbar-path-enum';

@Component({
  selector: 'app-header',
  imports: [LogoComponent, NavbarComponent, SearchComponent],
  template: `
    <header class="header">
  <section class="header__wrapper header__wrapper--logo">
    <app-logo />
  </section>
  <section class="header__wrapper header__wrapper--search">
    <app-search />
  </section>
  <section class="header__wrapper header__wrapper--nav">
    <app-navbar [navLinks]="navLinks" (navLinkClick)="navigateTo($event)" />
  </section>
</header>

`,
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  navLinks = NavbarPaths;

  route = inject(Router);

  navigateTo(path: string) {
    this.route.navigate([path]);
  }

}
