import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { EcommerceUserAuthService } from '../_services/ecommerce-user-auth-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    private authService: EcommerceUserAuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.isLoggedIn()) {
      const roles = route.data['roles'] as Array<string>;
      if (roles && roles.length > 0) {
        if (this.authService.roleMatch(roles)) {
          return true;
        }
      }
      this.router.navigate(['/forbidden']);
      return false;
    }
    
    this.router.navigate(['/login']);
    return false;
  }
}