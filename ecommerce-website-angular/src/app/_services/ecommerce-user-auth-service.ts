import { Injectable } from '@angular/core';

interface UserRole {
  roleId: string;
}

@Injectable({
  providedIn: 'root'
})
export class EcommerceUserAuthService {
  constructor() { }

  public setToken(token: string) {
    localStorage.setItem("token", token);
  }
  
  public getToken(): string | null {
    return localStorage.getItem("token");
  }

  public setRoles(roles: UserRole[]) {
    localStorage.setItem("roles", JSON.stringify(roles));
  }

  public getRoles(): UserRole[] {
    const roles = localStorage.getItem("roles");
    if (roles) {
      return JSON.parse(roles);
    }
    return [];
  }

  public isLoggedIn(): boolean {
    const token = this.getToken();
    if (token && token.trim().length > 0) {
      return true;
    }
    return false;
  }

  public isAdmin(): boolean {
    return this.roleMatch(['admin']);
  }

  public isUser(): boolean {
    return this.roleMatch(['user']);
  }

  public clear() {
    localStorage.clear();
  }

  roleMatch(allowedRoles: string[]): boolean {
    const userRoles: UserRole[] = this.getRoles();
    return allowedRoles.some(role => 
      userRoles.some(userRole => userRole.roleId === role)
    );
  }
}
