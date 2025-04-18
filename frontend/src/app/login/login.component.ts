import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


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

  constructor(private http: HttpClient,private router: Router, private cookieService: CookieService) {}

  onSubmit() {
    this.http.post<{ message: string; token?: string }>('http://localhost:3000/auth/login', this.user)
      .subscribe({
        next: res => {
          this.message = res.message;
          if (res.token) {
            this.cookieService.set('token', res.token); 
            this.router.navigate(['/todos']); 
          }
        },
        error: err => this.message = err.error.message || 'Login failed'
      });
  }
}








// const todos=[
//   {
//         "_id": "67fe418a28fd76d233d41781",
//         "title": "hansss",
//         "priority": "low",
//         "status": "PENDING",
//         "userId": {
//             "role": "USER",
//             "_id": "67fe3fcb099d6ba04ee0c9fd",
//             "name": "Rohit HNS",
//             "email": "rohit@og.com",
//             "password": "123",
//             "createdAt": "2025-04-15T11:15:23.383Z",
//             "updatedAt": "2025-04-15T11:15:23.383Z"
//         },
//         "createdAt": "2025-04-15T11:22:50.235Z",
//         "updatedAt": "2025-04-16T11:34:25.031Z"
//     },
//     {
//         "_id": "67ff8c8426662752f6197e02",
//         "title": "first todo",
//         "priority": "high",
//         "status": "PENDING",
//         "userId": {
//             "role": "USER",
//             "_id": "67fe3fcb099d6ba04ee0c9fd",
//             "name": "Rohit HNS",
//             "email": "rohit@og.com",
//             "password": "123",
//             "createdAt": "2025-04-15T11:15:23.383Z",
//             "updatedAt": "2025-04-15T11:15:23.383Z"
//         },
//         "createdAt": "2025-04-16T10:55:00.071Z",
//         "updatedAt": "2025-04-16T10:55:00.071Z"
//     },
//     {
//         "_id": "6800a5ae3d6d5bd57a06e876",
//         "title": "second todo ",
//         "priority": "high",
//         "status": "PENDING",
//         "userId": {
//             "_id": "67fcb09057a6b8f9f3d78152",
//             "name": "anmol",
//             "email": "anmol@vp.com",
//             "password": "1234",
//             "createdAt": "2025-04-14T06:52:00.616Z",
//             "updatedAt": "2025-04-14T06:52:00.616Z",
//             "__v": 0,
//             "role": "ADMIN"
//         },
//         "createdAt": "2025-04-17T06:54:38.650Z",
//         "updatedAt": "2025-04-17T06:54:38.650Z"
//     }
// ]




// for (let i = 0; i < todos.length; i++) {
// const todo = todos[i];
// //const user=todo['userId'];
// //console.log('userId.email');

// const list = {
// _id: todo._id,
// title: todo.title,
// priority: todo.priority,
// status: todo.status,
// userEmail: todo.userId.email,
// username: todo.userId.name
// };

// console.log(list);
// }













// //map

// const Todos = todos.map(todo => {
// return {
// _id: todo._id,
// title: todo.title,
// priority: todo.priority,
// status: todo.status,
// userEmail: todo.userId.email,
// username: todo.userId.name
// };
// });

// console.log(Todos);
