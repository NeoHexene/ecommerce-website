import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, NgForm } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Product } from '../_model/product.model';
import { EcommerceProductService } from '../_services/ecommerce-product-service';

@Component({
  selector: 'app-ecommerce-add-new-product',
  imports: [MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule,
    FormsModule
  ],
  templateUrl: './ecommerce-add-new-product.html',
  styleUrl: './ecommerce-add-new-product.css'
})
export class EcommerceAddNewProduct implements OnInit {

  readonly = false;

  constructor(private productService: EcommerceProductService) {}

  ngOnInit(): void {
    console.clear();
  }

  saveProduct(form: NgForm) {
    if (form.valid) {
      this.readonly = true;
      this.productService.saveProduct(form.value).subscribe({
        next:(response) => {
          console.log("Response: ", response);
          this.readonly = false;
          form.reset();
        },
        error: (error) => {
          console.log("Error: ", error);
          this.readonly = false;
          alert('Error occurred while saving product: ' + (error.error?.message || 'Please try again'));
        }
      });
    }
  }

}
