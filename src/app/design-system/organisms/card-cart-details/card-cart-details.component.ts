import { Component, Input } from '@angular/core';
import { OrderItem } from '../../../shared/models/order.model';
import { CardCartDetailsProps } from '../../../shared/types/types-prop-design-system/organisms/CardCartDetailsProps.type';
import { CommonModule } from '@angular/common';
import { ImageOptimizedProps } from '../../../shared/types/types-prop-design-system/atoms/ImageOptimizedProps.type';
import { ImageOptimizedComponent } from '../../atoms/image-optimized/image-optimized.component';

@Component({
  selector: 'app-card-cart-details',
  standalone: true,
  imports: [CommonModule, ImageOptimizedComponent],
  templateUrl: './card-cart-details.component.html',
  styleUrl: './card-cart-details.component.scss'
})
export class CardCartDetailsComponent {

  @Input() props !: CardCartDetailsProps;

  image = '/assets/login.png';

  imageCard: ImageOptimizedProps = {
    imagePath: this.image,
    width: 250,
    height: 250
  }
  
  getTotalPrice(): number {
    if (this.props?.orderItems && this.props.orderItems.length > 0) {
      return this.props.orderItems.reduce((sum, item) => sum + item.itemTotal, 0);
    }
    return 0; // Retorna 0 si no hay items
  }

  
}
