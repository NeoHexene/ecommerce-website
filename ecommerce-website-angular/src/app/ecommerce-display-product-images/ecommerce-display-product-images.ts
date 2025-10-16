import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-ecommerce-display-product-images',
  imports: [
    MatDialogModule,
    CommonModule,
    MatButtonModule,
    MatGridListModule
  ],
  templateUrl: './ecommerce-display-product-images.html'
})
export class EcommerceDisplayProductImages {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

}
