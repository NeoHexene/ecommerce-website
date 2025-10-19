import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, NgForm } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { EcommerceProductService } from '../_services/ecommerce-product-service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { Drag } from '../drag';
import { map } from 'rxjs';
import { EcommerceImageProcessingService } from '../_services/ecommerce-image-processing-service';

@Component({
  selector: 'app-ecommerce-add-new-product',
  imports: [CommonModule,
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
  product: any = {};

  constructor(private productService: EcommerceProductService,
    private domSanitizer: DomSanitizer,
    private imageProcessingService: EcommerceImageProcessingService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    console.clear();
    this.productImagesList = [];
    this.product = {};
    if (history && history.state && history.state.id) {
      this.getProductDetailsById(history.state.id);
    }
  }

  getProductDetailsById(id: number) {
    this.readonly = true;
    this.productService.getProductDetailsById(id).pipe(
      map((response: any) => {
        if (response && response.data) {
          response.data = this.imageProcessingService.createImages(response.data);
        }
        return response;
      })
    ).subscribe({
      next: (response) => {
        console.log("Response: ", response);
        this.readonly = false;
        if (response && response.data) {
          this.product = response.data;
          this.productImagesList = this.product.productImages;
          this.cdr.detectChanges();
        }
      },
      error: (error) => {
        console.log("Error: ", error);
        this.readonly = false;
        alert('Error occurred while getting product details: ' + (error.error?.message || 'Please try again'));
      }
    });
  }

  onFileSelection(event: any) {
    if (event.target.files) {
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

  prepareFormData(productData: any): FormData {
    const formData = new FormData();
    formData.append('product', new Blob([JSON.stringify(productData)], { type: 'application/json' }));
    this.productImagesList.forEach((image: any) => {
      formData.append('imageFile', image.file, image.file.name);
    });
    return formData;
  }

  saveProduct(form: NgForm) {
    if (form.valid) {
      this.readonly = true;
      const productData = form.value;
      if (this.product && this.product.id) {
        productData.id = this.product.id;
      }
      const formData = this.prepareFormData(productData);
      console.log("Product FormData: ", formData);
      this.productService.saveProduct(formData).subscribe({
        next: (response) => {
          console.log("Response: ", response);
          this.readonly = false;
          form.reset();
          this.product = {};
          this.productImagesList = [];
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.log("Error: ", error);
          this.readonly = false;
          this.cdr.detectChanges();
          alert('Error occurred while saving product: ' + (error.error?.message || 'Please try again'));
        }
      });
    }
  }

  clearForm(form: NgForm) {
    form.reset();
    this.product = {};
    this.productImagesList = [];
    this.cdr.detectChanges();
  }
}
