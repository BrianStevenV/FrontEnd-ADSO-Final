import { Component, HostListener, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CloseHamburguerButtonComponent } from "../../atoms/close-hamburguer-button/close-hamburguer-button.component";
import { HamburguerButtonComponent } from "../../atoms/hamburguer-button/hamburguer-button.component";
import { NavLinkComponent } from "../../atoms/nav-link/nav-link.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [CloseHamburguerButtonComponent, HamburguerButtonComponent, NavLinkComponent, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  isMobile !: boolean;
  isMenuOpen !: boolean;

  @Input() navLinks !: any;
  @Output() navLinkClick = new EventEmitter<string>();

  @HostListener('window:resize', ['$event'])
  ngOnInit(): void {
    this.checkScreenSize();
  }

  checkScreenSize(): void {
    this.isMobile = window.innerWidth <= 768;
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onNavLinkClick(link: string) {
    this.navLinkClick.emit(link);
  }

}
