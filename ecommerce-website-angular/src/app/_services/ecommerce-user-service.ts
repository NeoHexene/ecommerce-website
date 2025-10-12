import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EcommerceUserAuthService } from './ecommerce-user-auth-service';

@Injectable({
  providedIn: 'root'
})
export class EcommerceUserService {
  private BASE_URL = 'http://localhost:8080';
  private BASE_USER_URL = '/ecommerce/user';
  private BASE_ADMIN_URL = '/ecommerce/admin';

  requestHeader = new HttpHeaders( { "No-Auth": "True" } );

  constructor(
    private http: HttpClient
  ) { }

  login(loginData: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.BASE_URL}/ecommerce/jwt/v1/create`, loginData, { headers: this.requestHeader});
  }

  // Example method to get user profile
  getUserProfile(): Observable<any> {
    return this.http.get(`${this.BASE_URL}${this.BASE_USER_URL}/v1/get`);
  }

  getAdminProfile(): Observable<any> {
    return this.http.get(`${this.BASE_URL}${this.BASE_ADMIN_URL}/v1/get`);
  }
}
