import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [HeaderComponent, FooterComponent, RouterOutlet],
  template: `
    <div class="body">
      <app-header/>
      <div class="wrapper">
          <router-outlet/>
      </div>
      <app-footer/>
    </div>
`,
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
