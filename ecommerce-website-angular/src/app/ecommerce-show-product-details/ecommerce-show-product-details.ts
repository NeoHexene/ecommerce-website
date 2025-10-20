import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { EcommerceProductService } from '../_services/ecommerce-product-service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EcommerceDisplayProductImages } from '../ecommerce-display-product-images/ecommerce-display-product-images';
import { EcommerceImageProcessingService } from '../_services/ecommerce-image-processing-service';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ecommerce-show-product-details',
  imports: [
    MatTableModule,
    CommonModule,
    MatPaginatorModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './ecommerce-show-product-details.html'
})
export class EcommerceShowProductDetails implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['show-product-id', 'show-product-name', 'show-product-description', 'show-product-discountedPrice', 'show-product-actualPrice', 'show-product-action'];
  dataSource = new MatTableDataSource<any>([]);
  pageNumber = 0;
  pageSize = 10;
  
  constructor(private productService: EcommerceProductService,
    private imagesDialog: MatDialog,
    private imageProcessingService: EcommerceImageProcessingService,
    private router: Router
  ) { }
  
  ngOnInit(): void {
    console.clear();
    this.pageNumber = 0;
    this.pageSize = 10;
    this.getAllProductDetails();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
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
        if (response && response.data) {
          this.dataSource.data = response.data;
        }
      },
      error: (error) => {
        console.error("Error: ", error);
        alert("Error occurred in get all products: " + (error.error?.message || "Please try again"));
      }
    });
  }

  deleteProductDetails(element: any) {
    if (element && element.id) {
      this.productService.deleteProductDetailsById(element.id).subscribe({
        next: (response) => {
          console.log("Response: ", response);
          this.getAllProductDetails();
        },
        error: (error) => {
          console.error("Error: ", error);
          alert("Error occurred while deleting the product: " + (error.error?.message || "Please try again"));
        }
      });

    }
  }

  editProductDetails(element: any) {
    this.router.navigate(['/add-new-product'], {
      state: {
        id: element.id
      }
    });
  }

  showProductImages(element: any) {
    this.imagesDialog.open(EcommerceDisplayProductImages, {
      height: '500px',
      width: '800px',
      data: {
        images: element.productImages
      }
    });
  }

}
