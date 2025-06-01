import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';
import { FormControl, ReactiveFormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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
  styleUrl: './input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
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

  writeValue(value: any): void {
    this.value = value;
    this.inputControl.setValue(value); // Ensure the FormControl is also updated
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.inputControl.disable() : this.inputControl.enable();
  }
}