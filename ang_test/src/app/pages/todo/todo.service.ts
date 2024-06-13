import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  fetchTasks(): Observable<any[]> {
    const storedUser = localStorage.getItem("loggedUser");
    const name = storedUser ? JSON.parse(storedUser).sub : '';
    
    // Assuming you have an API endpoint to fetch tasks for a user
    return this.http.get<any[]>('http://localhost:3000/task', {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ', // Include your token here
        'name': name // Include user name in headers
      })
    });
  }

  addTask(todo: string): Observable<any> {
    const storedUser = localStorage.getItem("loggedUser");
    const name = storedUser ? JSON.parse(storedUser).sub : '';
    const mail = storedUser ? JSON.parse(storedUser).email : '';
    
    // Assuming you have a FormGroup named 'form' with a 'todo' FormControl
    const data = {
      name: name,
      email: mail,
      todo: todo
    };
    
    return this.http.post('http://localhost:3000/task/add', data);
  }

  updateTask(id: number, title: string): Observable<any> {
    const storedUser = localStorage.getItem("loggedUser");
    const name = storedUser ? JSON.parse(storedUser).sub : '';
    const mail = storedUser ? JSON.parse(storedUser).email : '';
    // Assuming you have a FormGroup named 'form' with a 'title' FormControl
    const data = {
        id,
      username: name,
      mail: mail,
      title: title
    };
    return this.http.post('http://localhost:3000/task/update', data);
  }

  deleteTask(id: number): Observable<any> {
    // Assuming you have an API endpoint to delete a task
    return this.http.post(`http://localhost:3000/task/delete`,{ id: id });
  }
}
