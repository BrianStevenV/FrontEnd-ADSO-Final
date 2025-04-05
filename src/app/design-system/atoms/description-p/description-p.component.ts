import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-description-p',
  imports: [],
  template: `
  <p>{{description}}</p>
  `,
  styleUrl: './description-p.component.scss'
})
export class DescriptionPComponent {

  @Input() description !: string;
  @Input() fontSize !: string;
  @Input() fontWeight !: string;
  @Input() color !: string;
  

}
