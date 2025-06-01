import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-label',
  standalone: true,
  imports: [],
  template: `<label>{{ nameLabel }}</label>`,
  styleUrl: './label.component.scss'
})
export class LabelComponent {
  @Input() nameLabel !: string;

}
