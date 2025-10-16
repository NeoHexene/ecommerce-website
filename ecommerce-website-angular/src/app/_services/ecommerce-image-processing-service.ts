import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class EcommerceImageProcessingService {

  productImagesList: any[] = [];

  constructor(private domSanitizer: DomSanitizer) { }

  public createImages (element: any) {
    this.productImagesList = [];
    const elementImagesList: any[] = element.productImages;

    elementImagesList.forEach((ele) =>{
      const imageBlob = this.dataUriToBlob(ele.imageByte, ele.imageType);
      const file = new File ([imageBlob], ele.imageName, { type: ele.imageType });
      const obj = {
        file: file,
        url: this.domSanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file))
      };
      this.productImagesList.push(obj);
    });
    
    element.productImages = this.productImagesList;
    return element;
  }

  dataUriToBlob(imageByte: any, imageType: any) {
    const byteString = window.atob(imageByte);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([int8Array], { type: imageType });
    return blob;
  }
}
