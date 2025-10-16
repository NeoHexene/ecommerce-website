import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, NgForm } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { EcommerceProductService } from '../_services/ecommerce-product-service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { Drag } from '../drag';

@Component({
  selector: 'app-ecommerce-add-new-product',
  imports: [ CommonModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule,
    FormsModule,
    MatGridListModule,
    Drag
  ],
  templateUrl: './ecommerce-add-new-product.html'
})
export class EcommerceAddNewProduct implements OnInit {

  readonly = false;
  productImagesList: any = [];

  constructor(private productService: EcommerceProductService,
    private domSanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    console.clear();
    this.productImagesList = [];
  }

  onFileSelection(event: any) {
    if(event.target.files) {
      const filesArray: File[] = Array.from(event.target.files);
      filesArray.forEach((file: any) => {
        let obj = {
          file: file,
          url: this.domSanitizer.bypassSecurityTrustUrl(
            window.URL.createObjectURL(file)
          )
        }
        this.productImagesList.push(obj);
      });
    }
  }

  dragAndDropFiles(event: any) {
    this.productImagesList = event;
  }

  removeSelectedFile(index: number) {
    this.productImagesList.splice(index, 1);
  }

  prepareFormData(form: NgForm): FormData {
    const formData = new FormData();
    formData.append('product', new Blob([JSON.stringify(form.value)],{type: 'application/json'}));
    this.productImagesList.forEach((image: any) => {
      formData.append('imageFile', image.file, image.file.name);
    });
    return formData;
  }
  
  saveProduct(form: NgForm) {
    if (form.valid) {
      this.readonly = true;
      const formData = this.prepareFormData(form);
      console.log("Product FormData: ", formData);
      this.productService.saveProduct(formData).subscribe({
        next:(response) => {
          console.log("Response: ", response);
          this.readonly = false;
          form.reset();
          this.productImagesList = [];
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
