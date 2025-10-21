import { ChangeDetectorRef, Component } from '@angular/core';
import { EcommerceProductService } from '../_services/ecommerce-product-service';
import { SafeUrl } from '@angular/platform-browser';
import { EcommerceImageProcessingService } from '../_services/ecommerce-image-processing-service';
import { map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ecommerce-view-product-details',
  imports: [CommonModule,
    MatGridListModule,
    MatIconModule
  ],
  templateUrl: './ecommerce-view-product-details.html'
})
export class EcommerceViewProductDetails {

  readonly = false;
  productImagesList: any = [];
  product: any = {};
  mainImageUrl: SafeUrl = '';


  constructor(private productService: EcommerceProductService,
    private imageProcessingService: EcommerceImageProcessingService,
    private cdr: ChangeDetectorRef,
    private router: Router,
  ) { }

  ngOnInit(): void {
    console.clear();
    this.productImagesList = [];
    this.product = {};
    if (history && history.state && history.state.id) {
      this.getProductDetailsById(history.state.id);
    }
  }

  getProductDetailsById(id: number) {
    this.readonly = true;
    this.productService.getProductDetailsById(id).pipe(
      map((response: any) => {
        if (response && response.data) {
          response.data = this.imageProcessingService.createImages(response.data);
        }
        return response;
      })
    ).subscribe({
      next: (response) => {
        console.log("Response: ", response);
        this.readonly = false;
        if (response && response.data) {
          this.product = response.data;
          this.productImagesList = this.product.productImages;
          this.cdr.detectChanges();
        }
      },
      error: (error) => {
        console.log("Error: ", error);
        this.readonly = false;
        alert('Error occurred while getting product details: ' + (error.error?.message || 'Please try again'));
      }
    });
  }

  changeMainImage(image: any): void {
    this.mainImageUrl = image.url;
  }

  buyProduct(id: number) {
    this.router.navigate(['/buy-product', {
      singleProduct: true,
      id: id
    }]);
  }

  addToCart(id: number) {
    this.productService.addToCart(id).subscribe({
      next: (response) => {
        console.log("Response: ", response);
        alert('Product added to cart successfully');
      },
      error: (error) => {
        console.log("Error: ", error);
        alert('Error occurred while adding product to cart: ' + (error.error?.message || 'Please try again'));
      }
    });
  }
}
