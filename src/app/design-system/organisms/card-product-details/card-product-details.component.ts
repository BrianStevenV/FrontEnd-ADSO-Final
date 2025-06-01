import { Component, Input } from '@angular/core';
import { FigureWithContentComponent } from "../figure-with-content/figure-with-content.component";
import { TitleH3Component } from "../../atoms/title-h3/title-h3.component";
import { ButtonComponent } from "../../atoms/button/button.component";
import { CardProductDetailsProps } from '../../../shared/types/types-prop-design-system/organisms/CardProductDetailsProps';
import { FigureWithContentProps } from '../../../shared/types/types-prop-design-system/organisms/FigureWithContent.type';
import { ButtonProps } from '../../../shared/types/types-prop-design-system/atoms/ButtonProps.type';
import { ImageOptimizedComponent } from '../../atoms/image-optimized/image-optimized.component';
import { ImageOptimizedProps } from '../../../shared/types/types-prop-design-system/atoms/ImageOptimizedProps.type';

@Component({
  selector: 'app-card-product-details',
  standalone: true,
  imports: [TitleH3Component, ButtonComponent, ImageOptimizedComponent],
  templateUrl: './card-product-details.component.html',
  styleUrl: './card-product-details.component.scss'
})
export class CardProductDetailsComponent {

  @Input() props !: CardProductDetailsProps;

  imagePath = '/assets/login.png'; 

  imageCard: ImageOptimizedProps = {
    imagePath: this.imagePath,
    width: 300,
    height: 300
  }

  get formattedPrice(): string {
    return `$${this.props.price}`;
  }
  

  addToCartBtnProps: ButtonProps = {
    buttonName: 'Add to Cart',
    buttonType: 'button',
    onClick: () => this.onAddToCart(this.props.productId)
  };

  onAddToCart(productId: number): void {
    console.log(`Product with ID ${productId} added to cart.`);
  }

}
