import { Component, computed, Input, signal } from '@angular/core';
import { TitleH3Component } from "../../atoms/title-h3/title-h3.component";
import { DescriptionPComponent } from "../../atoms/description-p/description-p.component";
import { ButtonComponent } from "../../atoms/button/button.component";
import { FigureWithContentComponent } from "../figure-with-content/figure-with-content.component";
import { CardProductProps } from '../../../shared/types/types-prop-design-system/organisms/CardProductProps.type';
import { FigureWithContentProps } from '../../../shared/types/types-prop-design-system/organisms/FigureWithContent.type';

@Component({
  selector: 'app-card-product',
  standalone: true,
  imports: [TitleH3Component, DescriptionPComponent, ButtonComponent, FigureWithContentComponent],
  template: `
    <app-figure-with-content
      [props]="figureWithContentProps" 
      >
      
      <app-title-h3 [title]="props.title"></app-title-h3>
      
      <section>
        <app-description-p [description]="formattedPrice"></app-description-p>
        <app-button [props]="props.button"
        ></app-button>
      </section>
    </app-figure-with-content>
  `,
  styleUrl: './card-product.component.scss'
})
export class CardProductComponent {

  @Input() props!: CardProductProps;

  get formattedPrice(): string {
    return `$${this.props.price}`;
  }

  get figureWithContentProps(): FigureWithContentProps {
    return { image: this.props.image };
  }
}
