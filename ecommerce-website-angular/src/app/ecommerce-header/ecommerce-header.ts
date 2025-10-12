import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { EcommerceUserAuthService } from '../_services/ecommerce-user-auth-service';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-ecommerce-header',
  imports: [RouterLink,
     RouterLinkActive, 
     CommonModule, 
     MatToolbarModule, 
     MatButtonModule, 
     MatFormFieldModule, 
     MatInputModule
    ],
  templateUrl: './ecommerce-header.html',
  styleUrl: './ecommerce-header.css'
})
export class EcommerceHeader implements OnInit {

  constructor(
    public userAuthService: EcommerceUserAuthService,
    private router: Router
  ) { };

  ngOnInit(): void {
  }

  isLoggedIn(): boolean {
    return this.userAuthService.isLoggedIn(); 
  }

  logout(): void {
    this.userAuthService.clear();
    this.router.navigate(['/']);
  }

}
