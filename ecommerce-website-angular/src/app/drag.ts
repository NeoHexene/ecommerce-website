import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Directive({
  selector: '[appDrag]'
})
export class Drag {

  @Output() fileEvent: EventEmitter<any> = new EventEmitter();

  productImagesList: any = [];

  @HostBinding("style.background") public background = "#eee"

  constructor(private domSanitizer: DomSanitizer) { }

  @HostListener("dragover", ["$event"])
  public onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.background = "#999";
  }

  @HostListener("dragleave", ["$event"])
  public onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.background = "#eee";
  }

  @HostListener("drop", ["$event"])
  public onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.background = "#eee";

    if(event.dataTransfer && event.dataTransfer.files.length > 0) {
      const filesArray: File[] = Array.from(event.dataTransfer.files);
      filesArray.forEach((file: any) => {
        let obj = {
          file: file,
          url: this.domSanitizer.bypassSecurityTrustUrl(
            window.URL.createObjectURL(file)
          )
        }
        this.productImagesList.push(obj);
      });
      this.fileEvent.emit(this.productImagesList);
    }
  }
}
