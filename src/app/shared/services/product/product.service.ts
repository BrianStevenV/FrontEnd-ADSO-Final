import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ProductResponse } from '../../models/product.model';
import { Pagination } from '../../models/paginator.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  readonly url = `${environment.product_base_path}${environment.product_controller}`;
  http = inject(HttpClient);
  
  getFeedHomeProducts(){
    return this.http.get<Pagination<ProductResponse>>(this.url)
  }

  // getPaginationProducts(){}

  // getPaginationFiltersProducts(){}

  // getProductById(productId : number): Observable<any>{
  //   const headers = null;
  //   return this.http.get<any>(this.url + environment.product_get_details + '/' + productId, { headers })
  // }
}
