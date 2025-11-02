import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink]
})
export class SignupComponent {
  name = '';
  email = '';
  password = '';
  passwordConfirm = '';
  showPassword = false;
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  signup() {
    if (!this.isFormValid()) {
      this.errorMessage = 'Please fill all fields with valid data';
      return;
    }

    if (this.password !== this.passwordConfirm) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.authService.signup(this.name, this.email, this.password, this.passwordConfirm).subscribe({
      next: (response) => {
        console.log('Signup successful:', response);
        this.isLoading = false;
        this.successMessage = 'Account created successfully! Redirecting to home...';
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 2000);
      },
      error: (error) => {
        console.error('Signup error:', error);
        console.error('Error details:', {
          status: error.status,
          statusText: error.statusText,
          message: error.error?.message,
          error: error.error
        });
        this.isLoading = false;
        
        // Show more specific error messages
        if (error.error?.message) {
          this.errorMessage = error.error.message;
        } else if (error.status === 0) {
          this.errorMessage = 'Cannot connect to server. Please make sure the backend is running.';
        } else if (error.status === 400) {
          this.errorMessage = error.error?.message || 'Invalid data. Please check your input.';
        } else if (error.status === 500) {
          this.errorMessage = 'Server error. Please try again later.';
        } else {
          this.errorMessage = 'Signup failed. Please try again.';
        }
      }
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    const passwordConfirmInput = document.getElementById('passwordConfirm') as HTMLInputElement;
    if (passwordInput) {
      passwordInput.type = this.showPassword ? 'text' : 'password';
    }
    if (passwordConfirmInput) {
      passwordConfirmInput.type = this.showPassword ? 'text' : 'password';
    }
  }

  getPasswordStrength(): string {
    if (!this.password) return '';
    
    const strength = this.calculatePasswordStrength(this.password);
    if (strength < 2) return 'weak';
    if (strength < 4) return 'medium';
    return 'strong';
  }

  getPasswordStrengthText(): string {
    const strength = this.getPasswordStrength();
    switch (strength) {
      case 'weak': return 'Weak password';
      case 'medium': return 'Medium strength';
      case 'strong': return 'Strong password';
      default: return '';
    }
  }

  private calculatePasswordStrength(password: string): number {
    let strength = 0;
    
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    return strength;
  }

  isFormValid(): boolean {
    return !!(this.name && this.email && this.password && this.passwordConfirm && this.password.length >= 6);
  }
}
