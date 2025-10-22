import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { EcommerceProductService } from '../_services/ecommerce-product-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { finalize, tap } from 'rxjs';

@Component({
  selector: 'app-ecommerce-view-my-orders',
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
  templateUrl: './ecommerce-view-my-orders.html'
})
export class EcommerceViewMyOrders {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [
    'view-order-id',
    'view-order-name',
    'view-order-address',
    'view-product-name',
    'view-order-amount',
    'view-order-status'
  ];
  dataSource = new MatTableDataSource<any>([]);

  totalElements: number = 0;
  pageSize: number = 10;
  pageNumber: number = 0;
  isLoading: boolean = false;

  constructor(private productService: EcommerceProductService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getUserOrderDetails();
  }

  ngAfterViewInit(): void {
    this.paginator.page
      .pipe(
        tap(() => this.getUserOrderDetails())
      )
      .subscribe();
  }

  getUserOrderDetails() {
    this.isLoading = true;
    const currentPageIndex = this.paginator ? this.paginator.pageIndex : this.pageNumber;
    const currentPageSize = this.paginator ? this.paginator.pageSize : this.pageSize;
    this.productService.getUserOrderDetails(this.pageNumber, this.pageSize).pipe(
      finalize(() => {
              this.isLoading = false;
              this.cdr.detectChanges();
            })
    ).subscribe({
      next: (response) => {
        console.log(response);
        this.dataSource.data = response.data || [];
        this.totalElements = response.totalPages || 0;
        this.pageNumber = response.number || 0;
        this.pageSize = response.size || currentPageSize;
      },
      error: (error) => {
        console.error(error);
        alert("Error occurred: " + (error.error?.message || "Please try again"));
        this.dataSource.data = [];
        this.totalElements = 0;
        this.cdr.detectChanges();
      }
    });
  }

  getProductNames(products: any[]): string {
    if (products && products.length > 0) {
      return products.map(product => product.productName).join(', ');
    } else {
      return 'N/A';
    }
  }
}
