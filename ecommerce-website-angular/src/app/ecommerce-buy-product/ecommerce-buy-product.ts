import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
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
  notCartCheckout: any = true;

  constructor(private activatedRoute: ActivatedRoute,
    private productService: EcommerceProductService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.productDetails = this.activatedRoute?.snapshot?.data['productDetails'];
    this.notCartCheckout = this.activatedRoute?.snapshot?.paramMap?.get('singleProduct');
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

  getQuantityForProduct(id: number) {
    const filteredProduct = this.productQuantityList.filter((product: any) => {
      return product.productId === id
    });
    return filteredProduct.length > 0 ? filteredProduct[0].quantity : 1;
  }

  getCalculatedProductTotal(id: number, price: number) {
    const quantity = this.getQuantityForProduct(id);
    return quantity * price;
  }

  onChangeQuantity(quantity: any, id: number) {
    const filteredProduct = this.productQuantityList.filter((product: any) => {
      return product.productId === id
    });
    if(filteredProduct && filteredProduct.length > 0) {
      filteredProduct[0].quantity = quantity;
    }
  }

  getCalculatedTotal() {
    let sum = 0;
    this.productQuantityList.forEach((product: any) => {
      const price = this.productDetails.filter((p: any) => p.id === product.productId)[0].productDiscountedPrice;
      sum += price * product.quantity;
    });
    return sum;
  }

  saveOrder(form: NgForm) {
    if(form.valid) {
      this.readonly = true;
      this.orderInput = form.value;
      if(this.productQuantityList && this.productQuantityList.length > 0) {
        this.orderInput.orderProductQuantityDtoList = this.productQuantityList;
      }
      console.log("Order Input: ", this.orderInput);
      this.productService.placeOrder(this.orderInput, this.notCartCheckout).subscribe({
        next: (response) => {
          console.log("Response: ", response);
          this.readonly = false;
          form.reset();
          this.orderInput = {};
          this.productQuantityList = [];
          this.notCartCheckout = true;
          this.cdr.detectChanges();
          this.router.navigate(['/order-confirmation'])
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
