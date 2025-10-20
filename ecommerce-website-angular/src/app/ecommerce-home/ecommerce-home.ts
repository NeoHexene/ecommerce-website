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
  pageNumber = 0;
  pageSize = 8;
  showLoadButton = false;

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
    this.pageNumber = 0;
    this.pageSize = 10;
  }

  viewProductDetails(id: number) {
    this.router.navigate(['/view-product-details'], {
      state: {
        id: id
      }
    });
  }

  loadMoreProducts() {
    this.pageNumber++;
    this.getAllProductDetails();
  }

  getAllProductDetails() {
    this.productService.getAllProducts(this.pageNumber,this.pageSize).pipe(
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
        if (response && response.data && response.data.length > 0) {
          this.productDetailsList = response.data;
          if (response.data.length < this.pageSize) {
            this.showLoadButton = false;
          } else {
            this.showLoadButton = true;
          }
        }
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error("Error: ", error);
        alert("Error occurred in get all products: " + (error.error?.message || "Please try again"));
      }
    });
  }
}
