import { Component, OnInit } from '@angular/core';
import { EcommerceUserService } from '../_services/ecommerce-user-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ecommerce-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ecommerce-user.html',
  styleUrl: './ecommerce-user.css'
})
export class EcommerceUser implements OnInit {

  constructor(
    private userService: EcommerceUserService
  ) { }

  message: any;

  ngOnInit(): void {
    console.clear();
    this.getUserProfile();
  }

  getUserProfile(): void {
    this.userService.getUserProfile().subscribe({
      next: (response) => {
        console.log('User Profile:', response);
        this.message = response.data.toString();
      },
      error: (error) => {
        console.error('Error fetching user profile:', error);
      }
    });
  }  

}
