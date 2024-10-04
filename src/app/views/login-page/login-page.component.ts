import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BillToBankCommonService } from '../service/bill-to-bank-common.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule ,FormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  isLoginMode: boolean = true;
  loginPhoneNumber: string = '';
  loginPassword: string = '';
  registerName: string = '';
  registerPhoneNumber: string = '';
  registerEmail: string = '';
  registerPassword: string = ''; 


  constructor(private billToBankCommonService: BillToBankCommonService , private router: Router) { }
  
  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }

    // Login Method
    userLogin() {
      if (!this.loginPhoneNumber || !this.loginPassword) {
        alert('Please fill in all fields');
        return;
      }
      
      this.billToBankCommonService.loginUser(this.loginPhoneNumber, this.loginPassword).subscribe({
        next: (response) => {
          console.log('Login successful', response);
          sessionStorage.setItem('token', response.token);
          this.router.navigate(['/dashboard']);
          

        },
        error: (error) => {
          console.error('Login failed', error);
          alert('Login failed. Please check your credentials.');
        }
      });
    }
  
    // Register Method
    userRegisteration() {
      if (!this.registerName || !this.registerPhoneNumber || !this.registerEmail || !this.registerPassword) {
        alert('Please fill in all fields');
        return;
      }
  
      const newUser = {
        name: this.registerName,
        number: this.registerPhoneNumber,
        role: "USER",
        email: this.registerEmail,
        password: this.registerPassword
      };
  
      this.billToBankCommonService.registerUser(newUser).subscribe({
        next: (response) => {
          console.log('Registration successful', response);
          alert('Registration successful');
          this.toggleMode(); // Switch to login mode after successful registration
        },
        error: (error) => {
          console.error('Registration failed', error);
          alert('Registration failed. Please try again.');
        }
      });
    }

}
