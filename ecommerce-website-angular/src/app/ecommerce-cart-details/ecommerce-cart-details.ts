import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { finalize, tap } from 'rxjs';
import { EcommerceProductService } from '../_services/ecommerce-product-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ecommerce-cart-details',
  imports: [MatTableModule,
    CommonModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule],
  templateUrl: './ecommerce-cart-details.html'
})
export class EcommerceCartDetails {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [
    'cart-product-id',
    'cart-product-productName',
    'cart-product-productDescription',
    'cart-product-discountedPrice',
    'cart-product-action'
  ];
  dataSource: any = new MatTableDataSource<any>([]);

  constructor(private productService: EcommerceProductService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { }

  isLoading: boolean = false;

  ngOnInit(): void {
    this.getCartDetails();
  }

  getCartDetails() {
    this.isLoading = true;
    this.productService.getCartDetails().pipe(
      finalize(() => {
        this.isLoading = false;
        this.cdr.detectChanges();
      })
    ).subscribe({
      next: (response) => {
        console.log("Response: ", response);
        this.dataSource.data = response.data || [];
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error("Error fetching products: ", error);
        alert("Error occurred: " + (error.error?.message || "Please try again"));
        this.cdr.detectChanges();
      }
    });
  }

  checkout() {
    // this.productService.getProductCheckoutDetails(false, 0).subscribe({
    //   next: (response) => {
    //     console.log("Response: ", response);
    //   },
    //   error: (error) => {
    //     console.error("Error in checkout: ", error);
    //   }
    // });
    this.router.navigate(['/buy-product', {
      singleProduct: false,
      id: 0
    }]);
  }

  removeCartItem(id: number) {
    this.productService.removeCartItem(id).subscribe({
      next: (response) => {
        console.log("Response: ", response);
        this.getCartDetails();
      },
      error: (error) => {
        console.error("Error in removing cart item: ", error);
      }
    });
  }
}
