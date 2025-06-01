import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { AddStockQuantityRequestDto, CreateProductRequest, DashboardProductInventory, DefinitionAttributeRequestDto, ProductResponse } from '../../models/product.model';
import { Pagination } from '../../models/paginator.model';
import { Category, CategoryAttribute } from '../../models/category.model';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly API_PRODUCT_ATTRIBUTES_CONTROLLER = `${environment.product_base_path}${environment.product_attributes_controller}`;
  private readonly API_PRODUCT_CONTROLLER = `${environment.product_base_path}${environment.product_controller}`;
  private readonly  API_CATEGORY_CONTROLLER = `${environment.product_base_path}${environment.category_controller}`;
  private http = inject(HttpClient);
  
  getFeedHomeProducts(){
    return this.http.get<Pagination<ProductResponse>>(this.API_PRODUCT_CONTROLLER + environment.product_get_feed);
  }

  getAllCategories(){
    return this.http.get<Category[]>(this.API_CATEGORY_CONTROLLER + environment.category_get_all);
  }

  getAttributesAccordingToCategory(categoryId: number){
    return this.http.get<CategoryAttribute[]>(this.API_CATEGORY_CONTROLLER + "/" + categoryId + environment.category_get_all_categories_attributes_according_to_category);
  }

  postDisableProduct(productId: number): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.API_PRODUCT_CONTROLLER}/${productId}`, { observe: 'response'});
  }

  patchProductQuantityStock(addStockQuantityRequest: AddStockQuantityRequestDto): Observable<HttpResponse<AddStockQuantityRequestDto>> {
    return this.http.patch<AddStockQuantityRequestDto>(this.API_PRODUCT_CONTROLLER + environment.product_patch_update_stock_quantity, addStockQuantityRequest, { observe: 'response'});

  }

  postCreateProduct(productRequestDto: CreateProductRequest): Observable<HttpResponse<CreateProductRequest>> {
    return this.http.post<CreateProductRequest>(this.API_PRODUCT_CONTROLLER + environment.product_post_create, productRequestDto, {
      observe: 'response'
    })
  }

  getDashboarProductsByUserProvider(){
    return this.http.get<Pagination<DashboardProductInventory>>(this.API_PRODUCT_CONTROLLER + environment.product_get_all_products_by_provider)
  }

  postCreateProductAttributes(definitionAttributeRequestDto: DefinitionAttributeRequestDto): Observable<HttpResponse<DefinitionAttributeRequestDto>>{
    const headers = AuthService.createAuthHeaders();
    return this.http.post<DefinitionAttributeRequestDto>(`${this.API_PRODUCT_ATTRIBUTES_CONTROLLER}${environment.product_attributes_post_create}`, definitionAttributeRequestDto, { headers, observe: 'response' });
  }

  getProductDetails(productId: number): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.API_PRODUCT_CONTROLLER}/${productId}`);
  }

}
