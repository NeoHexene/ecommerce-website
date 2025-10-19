import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { EcommerceProductService } from './ecommerce-product-service';
import { catchError, map } from 'rxjs';
import { EcommerceImageProcessingService } from './ecommerce-image-processing-service';

@Injectable({
  providedIn: 'root'
})
export class BuyProductResolver implements Resolve<any> {

  constructor(private productService: EcommerceProductService,
    private imageProcessingService: EcommerceImageProcessingService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.paramMap.get('id');
    const singleProduct = route.paramMap.get('singleProduct');
    return this.productService.getProductCheckoutDetails(singleProduct, id).pipe(
      map((response: any) => {
        if (response && response.data) {
          const processedData = response.data.map((product: any) => {
            return this.imageProcessingService.createImages(product);
          });
          return processedData;
        }
        return response;
      }),
      catchError((error) => {
        console.log("Error: ", error);
        alert('Error occurred while getting product details: ' + (error.error?.message || 'Please try again'));
        return [];
      })
    );
  }
}
