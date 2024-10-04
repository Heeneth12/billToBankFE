import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  // Method to check if the user is authenticated
  isAuthenticated(): boolean {
    const token = sessionStorage.getItem('token');
    // Check if the token exists and is not expired (basic check)
    return !!token; 
  }

  // Method to log out the user (remove the token)
  logout(): void {
    sessionStorage.removeItem('token');
  }
}
