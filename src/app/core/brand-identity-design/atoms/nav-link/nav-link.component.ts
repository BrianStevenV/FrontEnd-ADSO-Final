import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav-link',
  imports: [],
  template: `
    <a class="nav-link" (click)="onClick()">{{ nameLink }}</a>
    `,
  styleUrl: './nav-link.component.scss'
})
export class NavLinkComponent {

  @Input() nameLink !: string;
  @Input() routerLink !: string;
  @Output() linkClick = new EventEmitter<string>();

  onClick(){
    this.linkClick.emit(this.routerLink);
  }
}
