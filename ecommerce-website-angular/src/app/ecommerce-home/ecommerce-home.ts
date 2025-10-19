import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { EcommerceProductService } from '../_services/ecommerce-product-service';
import { EcommerceImageProcessingService } from '../_services/ecommerce-image-processing-service';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ecommerce-home',
  imports: [MatGridListModule,
    CommonModule,
    MatIconModule,],
  templateUrl: './ecommerce-home.html'
})
export class EcommerceHome implements OnInit {

  readonly = false;
  productImagesList: any = [];
  productDetailsList: any = [];
  product: any = {};

  constructor(
    private productService: EcommerceProductService,
    private imageProcessingService: EcommerceImageProcessingService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit(): void {
    console.clear();
    this.getAllProductDetails();
    this.productDetailsList = [];
    this.product = {};
    this.productImagesList = [];
  }

  viewProductDetails(id: number) {
    this.router.navigate(['/view-product-details'], {
      state: {
        id: id
      }
    });
  }

  getAllProductDetails() {
    this.productService.getAllProducts().pipe(
      map((response: any) => {
        if (response && response.data) {
          response.data = response.data.map((product: any) =>
            this.imageProcessingService.createImages(product)
          );
        }
        return response;
      })
    ).subscribe({
      next: (response) => {
        console.log("Response: ", response)
        if (response && response.data) {
          this.productDetailsList = response.data;
          this.cdr.detectChanges();
        }
      },
      error: (error) => {
        console.error("Error: ", error);
        alert("Error occurred in get all products: " + (error.error?.message || "Please try again"));
      }
    });
  }
}
