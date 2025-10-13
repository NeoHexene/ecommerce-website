import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EcommerceProductService {
  private BASE_URL = 'http://localhost:8080/ecommerce';
  private BASE_PRODUCT_URL = '/product';

  constructor(
    private http: HttpClient
  ) { }

  saveProduct(formData: FormData) {
    return this.http.post(`${this.BASE_URL}${this.BASE_PRODUCT_URL}/v1/create`, formData);
  }
  
}
