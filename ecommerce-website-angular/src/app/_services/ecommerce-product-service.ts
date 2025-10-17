import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EcommerceProductService {
  private BASE_URL = 'http://localhost:8080/ecommerce';
  private BASE_PRODUCT_URL = '/product';

  constructor(
    private http: HttpClient
  ) { }

  public saveProduct(formData: FormData): Observable<any>{
    return this.http.post(`${this.BASE_URL}${this.BASE_PRODUCT_URL}/v1/create`, formData);
  }

  public getAllProducts(): Observable<any> {
    return this.http.get(`${this.BASE_URL}${this.BASE_PRODUCT_URL}/v1/get-all`);
  }

  public getProductDetailsById(id: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}${this.BASE_PRODUCT_URL}/v1/get/${id}`);
  }

  public deleteProductDetailsById(id: number) {
    return this.http.delete(`${this.BASE_URL}${this.BASE_PRODUCT_URL}/v1/delete/${id}`);
  }
  
}
