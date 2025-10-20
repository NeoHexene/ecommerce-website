import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { EcommerceUserService } from '../_services/ecommerce-user-service';

@Component({
  selector: 'app-ecommerce-register-user',
  imports: [ FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './ecommerce-register-user.html'
})
export class EcommerceRegisterUser implements OnInit {

  readonly = false;

  constructor(private userServices: EcommerceUserService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {};

  ngOnInit(): void {
    console.clear();
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.userServices.registerNewUser(form.value).subscribe({
        next: (response) => {
          console.log('Response: ', response);
          this.readonly = false;
          form.reset();
          this.cdr.detectChanges();
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Error: ', error);
          this.readonly = false;
          this.cdr.detectChanges();
          alert('Registration failed: ' + (error.error?.message || 'Please try again'));
        }
      });
    }
  }
}
