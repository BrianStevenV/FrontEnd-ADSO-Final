import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonProps } from '../../../shared/types/types-prop-design-system/atoms/ButtonProps.type';
import { PaymentInfoProviders } from '../../../shared/models/payment-info.model';
import { PaymentInfoService } from '../../../shared/services/user/payment-info/payment-info.service';
import { Field } from '../../../shared/types/types-utils-design-system/FieldProps.type';
import { ToastService } from '../../../shared/services/toast/toast.service';
import { ToastType } from '../../../shared/models/toast.model';
import { FormSubmitComponent } from "../../../design-system/organisms/form-submit/form-submit.component";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment-methods',
  standalone: true,
  imports: [CommonModule, FormSubmitComponent],
  templateUrl: './payment-methods.component.html',
  styleUrl: './payment-methods.component.scss'
})
export class PaymentMethodsComponent implements OnInit{

  router = inject(Router);
  paymentInfoService = inject(PaymentInfoService);
  toastService = inject(ToastService);

  formBuilder = inject(FormBuilder);
  formGroup!: FormGroup;

  paymentProviders: PaymentInfoProviders[] = [];

  prevBtnProps: ButtonProps = {
    buttonName: 'Prev',
    buttonType: 'button',
    onClick: () => this.router.navigate(['/cart'])
  };

  nextBtnProps: ButtonProps = {
    buttonName: 'Next',
    buttonType: 'button',
    onClick: () => this.router.navigate(['/payment'])
  }

  ngOnInit(): void {
    this.initializeForm();
    this.loadInitialData();
  }

  paymentFields: Field[] = [
    { 
          nameLabel: 'Provider Payment', 
          formControlName: 'paymentProviderType', 
          inputType: 'select', 
          validators: [Validators.required], 
          options: [] 
    },
    {
      nameLabel: 'Card Number',
      formControlName: 'cardNumber',
      inputType: 'text',
      validators: [Validators.required, Validators.pattern(/^\d{16}$/)],
      maxLength: 16,
    }
  ]

  private initializeForm(){
    this.formGroup = this.formBuilder.group({
      paymentProviderId: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]]
    })
  }

  private loadInitialData(){
    this.getPaymentMethods();
  }

  getPaymentMethods(){
    this.paymentInfoService.getAllPaymentInfoProvider().subscribe({
      next: (paymentProviders) => this.handlePaymentProvidersLoaded(paymentProviders),
      error: this.handleDataLoadError
    });
  }

  private handlePaymentProvidersLoaded(paymentProviders: PaymentInfoProviders[]): void {
    this.paymentProviders = paymentProviders;
    this.updatePaymentProviderOptions();
  }

  private updatePaymentProviderOptions(): void {
    const paymentProviderField = this.findFieldByName(this.paymentFields, 'paymentProviderType');
    if (paymentProviderField) {
      paymentProviderField.options = this.paymentProviders.map(p => ({ 
        value: p.id, 
        label: p.paymentProviderName 
      }));
    }
  }
  private findFieldByName(fields: Field[], name: string): Field | undefined {
      return fields.find(field => field.formControlName === name);
    }
  private handleDataLoadError = (error: any): void => {
      console.error('Error loading data:', error);
      this.toastService.showToast('Error loading data. Please try again.', ToastType.ERROR);
    }
  

  
}
