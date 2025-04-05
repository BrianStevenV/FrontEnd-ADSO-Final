import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-title-h1',
  imports: [],
  template: `<h1 class="wrapper title">{{ title }}</h1>`,
  styleUrl: './title-h1.component.scss'
})
export class TitleH1Component {
  @Input() title !: string;

}
