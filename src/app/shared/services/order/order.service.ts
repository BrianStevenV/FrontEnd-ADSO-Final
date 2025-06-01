import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Order } from '../../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private readonly API_ORDER_CONTROLLER = `${environment.order_base_path}${environment.order_controller}`
  private http = inject(HttpClient);

  getCart(){
    return this.http.get<Order>(this.API_ORDER_CONTROLLER + environment.order_get_cart)
  }
}
