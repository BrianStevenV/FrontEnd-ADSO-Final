import { Component, Input } from '@angular/core';
import { LabelComponent } from '../../atoms/label/label.component';
import { InputComponent } from '../../atoms/input/input.component';
import { FormControl } from '@angular/forms';
import { SelectComponent } from '../../atoms/select/select.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [LabelComponent, InputComponent, SelectComponent, CommonModule],
  template: `
  <div class="wrapper">
    <div class="wrapper wrapper__label">
      <app-label [nameLabel]="nameLabel"></app-label>
    </div>
    <div class="wrapper wrapper__input">
      <ng-container *ngIf="inputType === 'select'; else inputTemplate">
        <app-select
          [options]="options || []"
          (onSelect)="inputControl.setValue($event)"
        ></app-select>
      </ng-container>
      <ng-template #inputTemplate>
        <app-input
          [value]="value"
          [inputControl]="inputControl"
          [inputType]="inputType"
          [maxLength]="maxLength"
        ></app-input>
      </ng-template>
    </div>
  </div>
  `,
  styleUrl: './form-field.component.scss'
})
export class FormFieldComponent {

  @Input() nameLabel!: string;
  @Input() inputType!: string;
  @Input() inputControl!: FormControl; 
  @Input() maxLength!: number;

  @Input() value!: any;

  @Input() options?: { value: any; label: string }[];

  
}
