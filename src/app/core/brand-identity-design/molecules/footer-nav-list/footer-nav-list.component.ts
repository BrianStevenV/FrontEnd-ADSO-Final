import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NavLinkComponent } from "../../atoms/nav-link/nav-link.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer-nav-list',
  imports: [NavLinkComponent, CommonModule],
  template: `
    <ul class="footer-nav-list">
      <li *ngFor="let link of footerLinks"> 
          <app-nav-link
          [nameLink]="link.title"
          [routerLink]="link.path"
          (linkClick)="onFooterLinkClick($event)" 
          />
      </li>
  </ul>
  `,
  styleUrl: './footer-nav-list.component.scss'
})
export class FooterNavListComponent {
  @Input() footerLinks !: any;
  @Output() footerLinkClick = new EventEmitter<string>();

  onFooterLinkClick(link: string) {
    this.footerLinkClick.emit(link);
  }

}
