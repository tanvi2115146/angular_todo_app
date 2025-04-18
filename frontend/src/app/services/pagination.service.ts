import { Injectable } from '@angular/core';
import { HttpClient ,HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  private baseUrl='https://localhost:3000/pagination';

  constructor(private http: HttpClient) { }

  getTodos(page: number, limit: number) {
    const params = new HttpParams().set('page', page).set('limit', limit);
    return this.http.get<any>(this.baseUrl, { params });
  }
}
