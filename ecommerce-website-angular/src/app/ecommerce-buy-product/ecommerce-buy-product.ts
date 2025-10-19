import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { EcommerceProductService } from '../_services/ecommerce-product-service';

@Component({
  selector: 'app-ecommerce-buy-product',
  imports: [CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './ecommerce-buy-product.html'
})
export class EcommerceBuyProduct implements OnInit {

  readonly = false;
  orderInput: any = {};
  productDetails: any = [];
  productQuantityList: any = [];

  constructor(private activatedRoute: ActivatedRoute,
    private productService: EcommerceProductService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    this.productDetails = this.activatedRoute?.snapshot?.data['productDetails'];
    this.productDetails.forEach((product: any) => {
      let obj = {
        productId: product.id,
        quantity: 1
      };
      this.productQuantityList.push(obj);
    });
    console.log(this.productDetails);
    console.log(this.productQuantityList);

  }

  saveOrder(form: NgForm) {
    if(form.valid) {
      this.readonly = true;
      this.orderInput = form.value;
      if(this.productQuantityList && this.productQuantityList.length > 0) {
        this.orderInput.orderProductQuantityDtoList = this.productQuantityList;
      }
      console.log("Order Input: ", this.orderInput);
      this.productService.placeOrder(this.orderInput).subscribe({
        next: (response) => {
          console.log("Response: ", response);
          this.readonly = false;
          form.reset();
          this.orderInput = {};
          this.productQuantityList = [];
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.log("Error: ", error);
          this.readonly = false;
          this.cdr.detectChanges();
          alert('Error occurred while placing order: ' + (error.error?.message || 'Please try again'));
        }
      });
    }
  }
}
