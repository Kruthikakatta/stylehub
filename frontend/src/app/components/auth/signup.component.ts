import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

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
  showPassword = false;

  constructor(private router: Router) {}

  signup() {
    if (this.name && this.email && this.password) {
      // Simulate signup process
      console.log('Signing up with:', { name: this.name, email: this.email });
      this.router.navigate(['/login']);
    } else {
      alert('Please fill all fields');
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    if (passwordInput) {
      passwordInput.type = this.showPassword ? 'text' : 'password';
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
    return !!(this.name && this.email && this.password && this.password.length >= 6);
  }
}
