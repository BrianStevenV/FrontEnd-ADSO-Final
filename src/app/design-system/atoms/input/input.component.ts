import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
  <ng-container *ngIf="inputType === 'textarea'; else textInput">
    <textarea
      [formControl]="inputControl"
      [maxlength]="maxLength"
      [value]="value"
      (input)="onInput($event)"
      class="input textarea"
      [style.resize]="'vertical'">
    </textarea>
  </ng-container>
  
  <ng-template #textInput>
    <input
      [formControl]="inputControl"
      [type]="inputType"
      [maxlength]="maxLength"
      [value]="value"
      (input)="onInput($event)"
      class="input">
    
  </ng-template>
  `,
  styleUrl: './input.component.scss'
})
export class InputComponent {

  @Input() value!: string | undefined | boolean;

  @Input() inputControl = new FormControl();
  @Input() inputType!: string;
  @Input() maxLength!: number;

  public onChange: any = () => {};
  public onTouch: any = () => {};


  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (this.inputType === 'checkbox') {
      this.value = input.checked;
    } else {
      this.value = input.value.slice(0, this.maxLength);
    }
    
    this.onChange(this.value);
  }

  ngOnInit(): void {
  }

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
}
