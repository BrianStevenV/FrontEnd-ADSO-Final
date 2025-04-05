import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonProps } from '../../../shared/types/types-prop-design-system/atoms/ButtonProps.type';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  template: `
  <button type={{props.buttonType}} class="button button--{{props.buttonType}}" (click)="handleClick()">{{props.buttonName}}</button>
  `,
  styleUrl: './button.component.scss'
})
export class ButtonComponent {

  @Input() props !: ButtonProps;
  @Output() onClick = new EventEmitter<any>();
  
  handleClick(): any {
    if(this.props.onClick){
      this.props.onClick(); 
    }
    this.onClick.emit(); 
  }
  
}
