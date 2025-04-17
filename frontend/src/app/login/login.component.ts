import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  user = {
    email: '',
    password: ''
  };
  message = '';

  constructor(private http: HttpClient,private router: Router) {}

  onSubmit() {
    this.http.post<{ message: string; token?: string }>('http://localhost:3000/auth/login', this.user)
      .subscribe({
        next: res => {
          this.message = res.message;
          if (res.token) {
            localStorage.setItem('token', res.token); 
            this.router.navigate(['/todos']); 
          }
        },
        error: err => this.message = err.error.message || 'Login failed'
      });
  }
}
