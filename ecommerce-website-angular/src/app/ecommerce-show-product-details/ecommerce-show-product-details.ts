import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { EcommerceProductService } from '../_services/ecommerce-product-service';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EcommerceDisplayProductImages } from '../ecommerce-display-product-images/ecommerce-display-product-images';
import { EcommerceImageProcessingService } from '../_services/ecommerce-image-processing-service';
import { map, tap, finalize } from 'rxjs';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-ecommerce-show-product-details',
  imports: [
    MatTableModule,
    CommonModule,
    MatPaginatorModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule
  ],
  templateUrl: './ecommerce-show-product-details.html'
})
export class EcommerceShowProductDetails implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [
    'show-product-id',
    'show-product-name',
    'show-product-description',
    'show-product-discountedPrice',
    'show-product-actualPrice',
    'show-product-action'
  ];
  dataSource = new MatTableDataSource<any>([]);

  totalElements: number = 0;
  pageSize: number = 10;
  pageNumber: number = 0;
  isLoading: boolean = false;
  searchProductKeyword = "";

  constructor(
    private productService: EcommerceProductService,
    private imagesDialog: MatDialog,
    private imageProcessingService: EcommerceImageProcessingService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getAllProductDetails();
  }

  ngAfterViewInit(): void {
    this.paginator.page
      .pipe(
        tap(() => this.getAllProductDetails())
      )
      .subscribe();
  }

  searchByKeyword(keyword: string) {
    this.pageNumber = 0;
    this.pageSize = 10;
    this.searchProductKeyword = keyword;
    this.getAllProductDetails();
  }

  getAllProductDetails() {
    this.isLoading = true;
    const currentPageIndex = this.paginator ? this.paginator.pageIndex : this.pageNumber;
    const currentPageSize = this.paginator ? this.paginator.pageSize : this.pageSize;

    this.productService.getAllProducts(currentPageIndex, currentPageSize, this.searchProductKeyword).pipe(
      map((response: any) => {
        if (response && response.data) {
          response.data = response.data.map((product: any) =>
            this.imageProcessingService.createImages(product)
          );
        }
        return response; // Return the full processed Page object
      }),
      finalize(() => {
        this.isLoading = false;
        this.cdr.detectChanges();
      })
    ).subscribe({
      next: (response) => {
        console.log("Response: ", response);
        this.dataSource.data = response.data || [];
        this.totalElements = response.totalElements || 0;
        this.pageNumber = response.number || 0;
        this.pageSize = response.size || currentPageSize;
      },
      error: (error) => {
        console.error("Error fetching products: ", error);
        alert("Error occurred: " + (error.error?.message || "Please try again"));
        this.dataSource.data = [];
        this.totalElements = 0;
        this.cdr.detectChanges();
      }
    });
  }

  deleteProductDetails(element: any) {
    if (element && element.id) {
      this.productService.deleteProductDetailsById(element.id).subscribe({
        next: (response) => {
          console.log("Product deleted: ", response);
          this.getAllProductDetails();
        },
        error: (error) => {
          console.error("Error deleting product: ", error);
          alert("Error occurred while deleting: " + (error.error?.message || "Please try again"));
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