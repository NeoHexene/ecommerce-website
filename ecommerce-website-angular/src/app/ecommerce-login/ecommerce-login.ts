import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { EcommerceUserService } from '../_services/ecommerce-user-service';
import { Router, RouterLink } from '@angular/router';
import { EcommerceUserAuthService } from '../_services/ecommerce-user-auth-service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-ecommerce-login',
  imports: [FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './ecommerce-login.html'
})
export class EcommerceLogin implements OnInit {

  readonly = false;

  constructor(
    private userService: EcommerceUserService,
    private userAuthService: EcommerceUserAuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {};

  ngOnInit(): void {
    console.clear();
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.readonly = true;
      this.userService.login(form.value).subscribe({
        next: (response) => {
          this.readonly = false;
          console.log('Response: ', response);
          if (response && response.data && response.data.jwtToken) {
            this.userAuthService.setToken(response.data.jwtToken);
            if (response.data.user.roles) {
              this.userAuthService.setRoles(response.data.user.roles);
              if (response.data.user.roles[0].roleId.includes("admin")) {
                this.router.navigate(["/admin"]);
              } else if (response.data.user.roles[0].roleId.includes("user"))  {
                this.router.navigate(["/user"]);
              } else {
                this.router.navigate(["/"]);
              }
            }
          }
        },
        error: (error) => {
          this.readonly = false;
          this.cdr.detectChanges();
          console.error('Error: ', error);
          alert('Login failed: ' + (error.error?.message || 'Please try again'));
        }
      });
    }
  }

}
