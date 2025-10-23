import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { EcommerceProductService } from '../_services/ecommerce-product-service';
import { finalize, tap } from 'rxjs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort, MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-ecommerce-view-all-orders',
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
    FormsModule,
    MatCheckboxModule,
    MatSortModule
  ],
  templateUrl: './ecommerce-view-all-orders.html'
})
export class EcommerceViewAllOrders {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'select',
    'view-order-id',
    'view-order-name',
    'view-order-address',
    'view-order-phone',
    'view-product-name',
    'view-order-amount',
    'view-order-status'
  ];
  dataSource: any = new MatTableDataSource<any>([]);
  selection: any = new SelectionModel<any>(true, []);
  totalElements: number = 0;
  pageSize: number = 10;
  pageNumber: number = 0;
  isLoading: boolean = false;

  constructor(private productService: EcommerceProductService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getAllOrderDetails();
  }

  ngAfterViewInit(): void {
    this.paginator.page
      .pipe(
        tap(() => {
          this.selection.clear();
          this.getAllOrderDetails();
        })
      )
      .subscribe();
    this.sort.sortChange.pipe(
      tap(() => {
        this.paginator.pageIndex = 0;
        this.selection.clear();
        this.getAllOrderDetails();
      })
    ).subscribe();
  }

  getAllOrderDetails() {
    this.isLoading = true;
    const currentPageIndex = this.paginator ? this.paginator.pageIndex : this.pageNumber;
    const currentPageSize = this.paginator ? this.paginator.pageSize : this.pageSize;
    this.productService.getAllOrderDetails(this.pageNumber, this.pageSize).pipe(
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
      }
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: any): string {
    if(!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  updateSelectedOrderStatus(status: string) {
    if(this.selection.selected.length === 0) {
      alert("Please select atleast 1 order to update status.");
      return;
    }
    if(status === 'Delivered' && this.canMarkAsDelivered())  {
      alert("Delivered orders can't be marked as delivered again.");
      return;
    }
    if(status === 'Canceled' && this.canMarkAsCanceled()) {
      alert("Canceled orders can't be marked as canceled again.");
      return;
    }
    const selectedOrderIds = this.selection.selected.map((order: any) => order.id);
    this.isLoading = true;
    this.productService.updateSelectedOrderStatus(selectedOrderIds, status).pipe(
      finalize(() => {
        this.isLoading = false;
        this.cdr.detectChanges();
      })
    ).subscribe({
      next: (response) => {
        console.log("Status updated to ${status} successfully");
        this.selection.clear();
        this.getAllOrderDetails();
      },
      error: (error) => {
        console.error(`Error updating order status to ${status}:`, error);
        alert(`Error updating status: ${error.error?.message || 'Please try again'}`);
      }
    });
  }

  canMarkAsDelivered(): boolean {
    if(this.selection.isEmpty()) {
      return true;
    }
    return this.selection.selected.some((order: any) => order.orderStatus === 'Delivered');
  }

  canMarkAsCanceled(): boolean {
    if(this.selection.isEmpty()) {
      return true;
    }
    return this.selection.selected.some((order: any) => order.orderStatus === 'Canceled');
  }

  markAsDelivered() {
    this.updateSelectedOrderStatus('Delivered');
  }

  markAsCanceled() {
    this.updateSelectedOrderStatus('Canceled');
  }

  getProductNames(products: any[]): string {
    if (products && products.length > 0) {
      return products.map(product => product.productName).join(', ');
    } else {
      return 'N/A';
    }
  }
}
