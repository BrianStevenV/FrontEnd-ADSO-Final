import { Component, Input } from '@angular/core';
import { FormFieldComponent } from "../../molecules/form-field/form-field.component";
import { ButtonComponent } from "../../atoms/button/button.component";
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';
import { Field } from '../../../shared/types/types-utils-design-system/FieldProps.type';
import { ButtonProps } from '../../../shared/types/types-prop-design-system/atoms/ButtonProps.type';

@Component({
  selector: 'app-form-submit',
  imports: [FormFieldComponent, ButtonComponent, CommonModule],
  template: `
  <div class="wrapper">
    <div class="form__group" *ngFor="let field of fields">
        <app-form-field class="form__field"
            [nameLabel]="field.nameLabel" 
            [inputControl]="getFormControl(field.formControlName)" 
            [inputType]="field.inputType" 
            [maxLength]="field.maxLength ?? 100"
            [options]="field.options"
        ></app-form-field>
    
    </div>
    <div class="button__group">
    <div class="buttons-container">
      <app-button *ngFor="let button of buttons" 
          [props]="button"
          class="submit__btn"
      ></app-button>
    </div>
  </div>
    
  </div>  
  `,
  styleUrl: './form-submit.component.scss'
})
export class FormSubmitComponent{

  @Input() formGroup!: FormGroup;
  @Input() fields!: Field[];
  @Input() btnProps !: ButtonProps;
  @Input() buttons!: ButtonProps[];

  getFormControl(name: string): FormControl {
    return this.formGroup.get(name) as FormControl;
  }

  
}
