
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { PaginationService } from '../services/pagination.service';
import { PaginationComponent } from '../pagination/pagination.component';



@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule,PaginationComponent],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'] 
})

export class TodoListComponent implements OnInit {
  todos: any[] = [];
  taskTitle = '';
  priority = 'High';
  status = 'Pending';
  message = '';

  isEditing = false;
  editTodoId: string | null = null;

  searchTerm: string = '';

  totalPages = 0;
  currentPage = 1;
  itemsPerPage = 5;

  filterStatus: string = '';
  filterPriority: string = '';


 //sorting 
  // allTodos: any[] = []; 
  selectedSort: string = 'priority';


  constructor(private http: HttpClient, private router: Router,private cookieService: CookieService,
    private paginationService: PaginationService
  ) {}



  getAuthHeaders() {
    const token = this.cookieService.get('token')
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }


loadTodos(page: number) {
  this.paginationService
    .getPaginatedTodos(page, this.itemsPerPage, this.searchTerm, this.selectedSort, this.filterStatus,
      this.filterPriority)
    .subscribe({
      next: (res) => {
        this.todos = res.todos;
        this.totalPages = res.totalPages;
        this.currentPage = res.currentPage;
       
      },
      error: () => {
        this.message = 'Failed to load paginated todos';
      }
    });
}



  ngOnInit() {
    this.loadTodos(this.currentPage);
  }


  applySort() {
    this.currentPage = 1;
    this.loadTodos(this.currentPage);
  }
  

  applyFilters(): void {
    this.loadTodos(1);
  }

//search

  get filteredTodos() {
    return this.todos.filter(todo =>
      todo.taskTitle?.toLowerCase().includes(this.searchTerm.toLowerCase().trim())
    );
  }
  


  onSearchChange() {
    this.currentPage = 1;
    this.loadTodos(this.currentPage);
  }
  


//add

  addTodo() {
    if (!this.taskTitle || !this.priority || !this.status) return;

    const newTodo = {
      taskTitle: this.taskTitle,
      priority: this.priority,
      status: this.status
    };

    this.http.post('http://localhost:3000/todo/add', newTodo, {
      headers: this.getAuthHeaders()
    }).subscribe({
      next: (res: any) => {
        this.message = res.message;
        this.taskTitle = '';
        this.priority =  'High';
        this.status ='Pending';
        this.loadTodos(this.currentPage); 
      },
      error: err => this.message = 'Failed to add task'
    });
  }


  deleteTodo(id: string) {
    if (!confirm('Are you sure you want to delete this task?')) return;

    this.http.delete(`http://localhost:3000/todo/${id}`, {
      headers: this.getAuthHeaders()
    }).subscribe({
      next: (res: any) => {
        this.message = res.message;
        this.loadTodos(this.currentPage); 
      },
      error: err => this.message = 'Failed to delete task'
    });
  }



  openEditModal(todo: any) {
    this.isEditing = true;
    this.editTodoId = todo._id;
    this.taskTitle = todo.taskTitle;
    this.priority = todo.priority;
    this.status = todo.status;
  }



  cancelEdit() {
    this.isEditing = false;
    this.editTodoId = null;
    this.taskTitle ='';
    this.priority =  'High';
    this.status ="Pending";
  }



  updateTodo() {
    if (!this.editTodoId) return;

    const updatedTodo = {
      taskTitle: this.taskTitle,
      priority: this.priority,
      status: this.status
    };

    this.http.put(`http://localhost:3000/todo/${this.editTodoId}`, updatedTodo, {
      headers: this.getAuthHeaders()
    }).subscribe({
      next: (res: any) => {
        this.message = res.message;
        this.cancelEdit();
        this.loadTodos(this.currentPage); 
      },
      error: err => this.message = 'Failed to update task'
    });
  }




  logout() {
    this.cookieService.delete('token');
    this.router.navigate(['/login']);
  }
  

}
