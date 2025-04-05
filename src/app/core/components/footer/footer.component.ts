import { Component, inject, Input } from '@angular/core';
import { LogoComponent } from "../../brand-identity-design/atoms/logo/logo.component";
import { FooterNavListComponent } from "../../brand-identity-design/molecules/footer-nav-list/footer-nav-list.component";
import { CommonModule } from '@angular/common';
import { FooterPaths } from '../../../shared/types/footer-path-enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [LogoComponent, FooterNavListComponent],
  template: `
    <footer class="footer">
  <section class="footer__wrapper footer__wrapper--logo">
    <app-logo />
  </section>
  <section class="footer__wrapper footer__wrapper--nav">
    <app-footer-nav-list [footerLinks]="footerLinks" />
  </section>
  <section class="footer__rights-container">
    © Your Company. All rights reserved.
  </section>
</footer>

  `,
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  footerLinks = FooterPaths;

  route = inject(Router)

  navigateTo(path: string) {
    this.route.navigate([path]);
  }
}
