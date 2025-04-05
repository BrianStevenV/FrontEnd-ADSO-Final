import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { PaymentInfoTypes } from '../../../models/payment-info.model';
import { PaymentInfoProviders } from '../../../models/payment-info.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentInfoService {

  http = inject(HttpClient);
  router = inject(Router); 
  
  private readonly BASE_HOST_MS = `${environment.user_base_path}`;
  private readonly PAYMENT_INFO_REST_CONTROLLER = `${environment.payment_info_controller}`
  private readonly PAYMENT_INFO_GET_PROVIDERS = `${environment.payment_info_get_payment_providers}`
  private readonly PAYMENT_INFO_GET_TYPES = `${environment.payment_info_get_payment_types}`

  
  getAllPaymentInfoProvider(){
    return this.http.get<PaymentInfoProviders[]>(this.BASE_HOST_MS + this.PAYMENT_INFO_REST_CONTROLLER + this.PAYMENT_INFO_GET_PROVIDERS);
  }
  getAllPaymentInfoTypes(){
    return this.http.get<PaymentInfoTypes[]>(this.BASE_HOST_MS + this.PAYMENT_INFO_REST_CONTROLLER + this.PAYMENT_INFO_GET_TYPES);
  }
}
