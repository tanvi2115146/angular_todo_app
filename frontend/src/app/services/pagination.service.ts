import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  private baseUrl = 'http://localhost:3000/todo/pagination';

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  getAuthHeaders() {
    const token = this.cookieService.get('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getPaginatedTodos(page: number, limit: number, search = ''): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.baseUrl}?page=${page}&limit=${limit}&search=${search}`, { headers });
  }
  
}

