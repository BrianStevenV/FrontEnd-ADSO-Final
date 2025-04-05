import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-title-h3',
  imports: [],
  template: `
  <h3>{{title}}</h3>
  `,
  styleUrl: './title-h3.component.scss'
})
export class TitleH3Component {

  @Input() title !: string;
}
