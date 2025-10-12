import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink]
})
export class LoginComponent {
  email = '';
  password = '';
  showPassword = false;

  constructor(private router: Router) {}

  login() {
    if (this.email && this.password) {
      // Simulate login process
      console.log('Logging in with:', { email: this.email });
      this.router.navigate(['/home']);
    } else {
      alert('Please enter email and password');
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    if (passwordInput) {
      passwordInput.type = this.showPassword ? 'text' : 'password';
    }
  }
}
