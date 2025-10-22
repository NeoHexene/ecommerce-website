import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EcommerceProductService {
  private BASE_URL = 'http://localhost:8080/ecommerce';
  private BASE_PRODUCT_URL = '/product';
  private BASE_ORDER_URL = '/order-details';
  private BASE_CART_URL = '/cart'

  constructor(
    private http: HttpClient
  ) { }

  public saveProduct(formData: FormData): Observable<any> {
    return this.http.post(`${this.BASE_URL}${this.BASE_PRODUCT_URL}/v1/create`, formData);
  }

  public getAllProducts(pageNumber: number, pageSize: number, searchKeyword: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}${this.BASE_PRODUCT_URL}/v1/get-all?page-number=${pageNumber}&page-size=${pageSize}&search-keyword=${searchKeyword}`);
  }

  public getProductDetailsById(id: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}${this.BASE_PRODUCT_URL}/v1/get/${id}`);
  }

  public deleteProductDetailsById(id: number) {
    return this.http.delete(`${this.BASE_URL}${this.BASE_PRODUCT_URL}/v1/delete/${id}`);
  }

  public getProductCheckoutDetails(singleProduct: any, id: any) {
    return this.http.get(`${this.BASE_URL}${this.BASE_PRODUCT_URL}/v1/check-out?single-product-checkout=${singleProduct}&product-id=${id}`);
  }

  public placeOrder(orderInput: any, notCartCheckout: string): Observable<any> {
    return this.http.post(`${this.BASE_URL}${this.BASE_ORDER_URL}/v1/place?not-cart-checkout=${notCartCheckout}`, orderInput);
  }

  public getUserOrderDetails(pageNumber: number, pageSize: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}${this.BASE_ORDER_URL}/v1/user/get-all?page-number=${pageNumber}&page-size=${pageSize}`);
  }

  public addToCart(id: number) {
    return this.http.get(`${this.BASE_URL}${this.BASE_CART_URL}/v1/get-items/${id}`);
  }

  public getCartDetails(): Observable<any> {
    return this.http.get(`${this.BASE_URL}${this.BASE_CART_URL}/v1/get`);
  }

  public removeCartItem(id: number) {
    return this.http.delete(`${this.BASE_URL}${this.BASE_CART_URL}/v1/remove-item/${id}`);
  }

}
