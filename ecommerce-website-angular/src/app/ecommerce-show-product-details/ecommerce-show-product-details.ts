import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { EcommerceProductService } from '../_services/ecommerce-product-service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-ecommerce-show-product-details',
  imports: [
    MatTableModule,
    CommonModule,
    MatPaginator
  ],
  templateUrl: './ecommerce-show-product-details.html'
})
export class EcommerceShowProductDetails implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['ID', 'Name', 'Description', 'Discounted Price', 'Actual Price'];
  dataSource = new MatTableDataSource<any>([]);

  constructor(private productService: EcommerceProductService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.clear();
    this.getAllProductDetails();
  }

  ngAfterViewInit(): void {
      this.dataSource.paginator = this.paginator;
  }

  getAllProductDetails() {
    this.productService.getAllProducts().subscribe({
      next:(response) => {
        console.log("Response: ", response)
        if(response && response.data) {
          this.dataSource.data = response.data;
          this.cdr.detectChanges();
        }
      },
      error:(error) => {
        console.error("Error: ", error);
        alert("Error occurred in get all products: " + (error.error?.message || "Please try again"));
      }
    });
  }

}
