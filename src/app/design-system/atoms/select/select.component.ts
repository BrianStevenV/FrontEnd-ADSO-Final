import { CommonModule } from '@angular/common';
import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule],
  template: `
  <select (change)="handleChange($event)" class="select">
    <option *ngFor="let option of options" [value]="option.value">{{option.label}}</option>
  </select>
`,
  styleUrl: './select.component.scss'
})
export class SelectComponent{

  @Input() options!: {value: any, label: string}[]
  @Output() onSelect = new EventEmitter<any>();
  
  handleChange(event: Event): void {
    let value = (event.target as HTMLSelectElement).value;
    this.onSelect.emit(value);
  }
  

}
