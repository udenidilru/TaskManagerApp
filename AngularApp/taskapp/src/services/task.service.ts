import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../model/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'https://localhost:44394/api/tasks'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  getTaskById(id: number): Observable<Task> {
   // const url = `${this.apiUrl}/${id}`;
    return this.http.get<Task>(`${this.apiUrl}/${id}`);
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  updateTask(id: number, task: Task): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, task);
  }

  deleteTask(id: number): Observable<Task[]> {
    return this.http.delete<Task[]>(`${this.apiUrl}/${id}`);
  }
}
