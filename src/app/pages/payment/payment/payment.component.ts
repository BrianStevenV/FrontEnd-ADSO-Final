import { Component, inject, OnInit } from '@angular/core';
import { FormSubmitComponent } from "../../../design-system/organisms/form-submit/form-submit.component";
import { Router } from '@angular/router';
import { OrderService } from '../../../shared/services/order/order.service';
import { Field } from '../../../shared/types/types-utils-design-system/FieldProps.type';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ButtonProps } from '../../../shared/types/types-prop-design-system/atoms/ButtonProps.type';
import { Order } from '../../../shared/models/order.model';
import { CardCartDetailsComponent } from "../../../design-system/organisms/card-cart-details/card-cart-details.component";

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [FormSubmitComponent, CardCartDetailsComponent],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent implements OnInit {

  router = inject(Router);
  orderService = inject(OrderService);
  formBuilder = inject(FormBuilder)

  order !: Order;
  formGroup !: FormGroup;
  shippingFields: Field[] = [
    {
      nameLabel: 'Recipient Name',
      formControlName: 'recipientName',
      inputType: 'text',
      validators: [Validators.required],
      maxLength: 50,
    },
    {
      nameLabel: 'Addresses',
      formControlName: 'addresses',
      inputType: 'text',
      validators: [Validators.required],
      maxLength: 100,
    },
    {
      nameLabel: 'Country',
      formControlName: 'country',
      inputType: 'text',
      validators: [Validators.required],
      maxLength: 50,
    },
    {
      nameLabel: 'City',
      formControlName: 'city',
      inputType: 'text',
      validators: [Validators.required],
      maxLength: 50,
    },
    {
      nameLabel: 'Phone',
      formControlName: 'phone',
      inputType: 'text',
      validators: [Validators.required],
      maxLength: 50,
    },
  ]

  buyBtnProps: ButtonProps = {
    buttonName: 'Buy Now',
    buttonType: 'button',
    onClick: () => this.router.navigate(['/home']),
  }
  prevBtnProps: ButtonProps = {
    buttonName: 'Previous',
    buttonType: 'button',
    onClick: () => this.router.navigate(['/payment-methods']),
  }

  ngOnInit(): void {
    this.initializeForm();
    this.getOrder();
  }

  private initializeForm(){
    this.formGroup = this.formBuilder.group({
      recipientName: ['', [Validators.required, Validators.maxLength(50)]],
      addresses: ['', [Validators.required, Validators.maxLength(100)]],
      country: ['', [Validators.required, Validators.maxLength(50)]],
      city: ['', [Validators.required, Validators.maxLength(50)]],
      phone: ['', [Validators.required, Validators.maxLength(50)]],
    });
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
