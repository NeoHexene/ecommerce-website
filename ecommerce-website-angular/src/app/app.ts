import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EcommerceHeader } from './ecommerce-header/ecommerce-header';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    EcommerceHeader,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ecommerce-website-angular');
}
