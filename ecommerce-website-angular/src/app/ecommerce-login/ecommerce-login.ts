import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { EcommerceUserService } from '../_services/ecommerce-user-service';
import { Router } from '@angular/router';
import { EcommerceUserAuthService } from '../_services/ecommerce-user-auth-service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-ecommerce-login',
  imports: [FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './ecommerce-login.html',
  styleUrl: './ecommerce-login.css'
})
export class EcommerceLogin implements OnInit {

  readonly = false;

  constructor(
    private userService: EcommerceUserService,
    private userAuthService: EcommerceUserAuthService,
    private router: Router
  ) {};

  ngOnInit(): void {
    console.clear();
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.readonly = true;
      this.userService.login(form.value).subscribe({
        next: (response) => {
          console.log('Response: ', response);
          // Store JWT token in localStorage
          if (response && response.data && response.data.JwtResponse && response.data.JwtResponse.jwtToken) {
            this.userAuthService.setToken(response.data.JwtResponse.jwtToken);
            if (response.data.JwtResponse.user.roles) {
              this.userAuthService.setRoles(response.data.JwtResponse.user.roles);
              if (response.data.JwtResponse.user.roles[0].roleId.includes("admin")) {
                this.router.navigate(["/admin"]);
              } else if (response.data.JwtResponse.user.roles[0].roleId.includes("user"))  {
                this.router.navigate(["/user"]);
              } else {
                this.router.navigate(["/home"]);
              }
            }
          }
        },
        error: (error) => {
          console.error('Error: ', error);
          alert('Login failed: ' + (error.error?.message || 'Please try again'));
        }
      });
      this.readonly = false;
    }
  }

}
