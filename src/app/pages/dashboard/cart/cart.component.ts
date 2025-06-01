import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonProps } from '../../../shared/types/types-prop-design-system/atoms/ButtonProps.type';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from "../../../design-system/atoms/button/button.component";
import { OrderService } from '../../../shared/services/order/order.service';
import { Order } from '../../../shared/models/order.model';
import { CardCartDetailsComponent } from "../../../design-system/organisms/card-cart-details/card-cart-details.component";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, ButtonComponent, CardCartDetailsComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{

  router = inject(Router);
  orderService = inject(OrderService);

  order !: Order;

  ngOnInit(): void {
    this.getOrder();
  }
  
  btnGoToPaymentMethodsProps: ButtonProps = {
    buttonName: 'Select to Payment Methods',
    buttonType: 'button',
    onClick: () => this.router.navigate(['/payment-methods'])
  }

  getOrder() {
    this.orderService.getCart().subscribe({
      next: (order: Order) => {
        this.order = order;
        console.log('Cart fetched successfully:', this.order);
      },
      error: (error) => {
        console.error('Error fetching cart:', error);
      }
    });
  }


}
