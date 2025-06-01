
import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges,
  ContentChildren,
  QueryList
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../design-system/atoms/button/button.component';
import { LabelComponent } from '../../../design-system/atoms/label/label.component';
import { InputComponent } from '../../../design-system/atoms/input/input.component';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { DropdownComponent } from '../../../design-system/molecules/dropdown/dropdown.component';
import { ButtonProps } from '../../../shared/types/types-prop-design-system/atoms/ButtonProps.type';

interface FormField {
  name: string;
  label: string;
  type: string;
  validators: any[];
  maxLength: number;
  value?: string | undefined;
}

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, ButtonComponent, LabelComponent, InputComponent, ReactiveFormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements OnInit, OnChanges {

  @Input() title!: string;
  @Input() closeButtonName!: string;
  @Input() submitButtonName!: string;
  @Input() formFields: FormField[] = [];
  @Input() requiredOthersCamps!: boolean;

  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() submitEvent = new EventEmitter<any>();

  @ContentChildren(DropdownComponent) dropdowns!: QueryList<DropdownComponent>;

  form: FormGroup = new FormGroup({});

  submitButtonProps!: ButtonProps;
  closeButtonProps!: ButtonProps;

  constructor() { }

  ngOnInit(): void {
      this.submitButtonProps = {
          buttonName: this.submitButtonName,
          buttonType: 'submit',
      };

      this.closeButtonProps = {
          buttonName: this.closeButtonName,
          buttonType: 'button',
          onClick: () => this.close()
      };
  }

  ngOnChanges(changes: SimpleChanges): void {
      if (changes['formFields'] && changes['formFields'].currentValue) {
          this.form = new FormGroup({});
          this.formFields.forEach(field => {
              this.form.addControl(field.name, new FormControl(field.value || '', field.validators));
          });
      }
  }

  getFormControl(name: string): FormControl {
      return this.form.get(name) as FormControl;
  }

  onSubmit(): void {
      console.log('Form submitted:', this.form.value);
      this.submitEvent.emit(this.form.value);
  }

  close(): void {
      this.closeModalEvent.emit();
  }
}
