import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../../atoms/button/button.component';
import { ButtonProps } from '../../../shared/types/types-prop-design-system/atoms/ButtonProps.type';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent ],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true
    }
  ]
})
export class DropdownComponent implements ControlValueAccessor{

  changeStateDropdownButtonProps: ButtonProps = {
    buttonName: 'Change State',
    buttonType: 'button',
    onClick: () => this.changeDropdownState()
  }

  changeStateDropdown: boolean = false;

  changeDropdownState() {
    this.changeStateDropdown = !this.changeStateDropdown;
    this.activateDropdown = true;
  }



  @Input() items!: any[];
  @Input() filteredItems!: any[];
  @Input() selectedItems!: any[];

  @Input() display!: string;
  @Input() id!: string;
  @Input() maxSelectedItems!: number;

  @Output() selectedItem = new EventEmitter<any>();
  @Output() removeItem = new EventEmitter<any>();

  @Input() formControl!: FormControl;

  @Input() controlName!: string;

  activateDropdown: boolean = true;


  btnDropdonProps: ButtonProps = {
    buttonName: 'Delete',
    buttonType: 'button',
    onClick: () => this.onRemoveItem(this.selectedItems)
  }
  

  onChange = (value: any) => {};
  onTouched = () => {};

  constructor() { }
  
  writeValue(obj: any): void {
    if (obj && Array.isArray(obj)) {
      this.selectedItems = this.items.filter(item => obj.includes(item[this.id]));
    } else {
      this.selectedItems = [];
    }
  }
  
  connectToForm(control: FormControl) {
    this.formControl = control;
    if (this.formControl) {
      this.formControl.valueChanges.subscribe(value => {
        this.writeValue(value);
      });
    }
  }

  setDisabledState?(isDisabled: boolean): void {
    if(this.formControl) {
      isDisabled ? this.formControl.disable() : this.formControl.enable();
    }
  }

  onSelectItem(item: any) {
    if (!this.selectedItems.includes(item) && this.selectedItems.length < this.maxSelectedItems) {
      this.selectedItems.push(item);
      this.formControl.setValue(this.selectedItems.map(selected => selected[this.id]));
      this.onChange(this.selectedItems.map(selected => selected[this.id]));
      this.selectedItem.emit(item);
    }
  
    
    if (this.selectedItems.length >= this.maxSelectedItems) {
      this.activateDropdown = false;
      this.selectedItem.emit(item);
    }
  }
  

  onRemoveItem(item: any) {
    this.selectedItems = this.selectedItems.filter(id => id !== item);
    this.removeItem.emit(item);
  }
 
  

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

}
