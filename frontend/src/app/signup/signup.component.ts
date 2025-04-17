import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-signup',
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.component.html'
})
export class SignupComponent {
  user = {
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  };
  message = '';

  constructor(private http: HttpClient) {}

  onSubmit() {
    this.http.post<{ message: string }>('http://localhost:3000/auth/signup', this.user)
      .subscribe({
        next: res => this.message = res.message,
        error: err => this.message = err.error.message || 'Signup failed'
      });
  }
}
