import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private baseUrl = 'http://localhost:3000/task';

  constructor(private http: HttpClient) { }

  // Utility method to get stored user details
  private getStoredUser() {
    const storedUser = localStorage.getItem("loggedUser");
    return storedUser ? JSON.parse(storedUser) : {};
  }

  fetchTasks(): Observable<any[]> {
    const { sub: name } = this.getStoredUser();

    return this.http.get<any[]>(this.baseUrl, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ', // Include your token here
        'name': name // Include user name in headers
      })
    });
  }

  addTask(todo: string): Observable<any> {
    const { sub: name, email: mail } = this.getStoredUser();

    const data = {
      name: name,
      email: mail,
      todo: todo
    };

    return this.http.post(`${this.baseUrl}/add`, data);
  }

  updateTask(id: number, title: string): Observable<any> {
    const { sub: name, email: mail } = this.getStoredUser();

    const data = {
      id,
      username: name,
      mail: mail,
      title: title
    };
    return this.http.post(`${this.baseUrl}/update`, data);
  }

  deleteTask(id: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/delete`, { id: id });
  }
}


// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class TodoService {

//   private baseUrl = 'http://localhost:3000/task';

//   constructor(private http: HttpClient) { }

//   fetchTasks(): Observable<any[]> {
//     const storedUser = localStorage.getItem("loggedUser");
//     const name = storedUser ? JSON.parse(storedUser).sub : '';

//     return this.http.get<any[]>(this.baseUrl, {
//       headers: new HttpHeaders({
//         'Authorization': 'Bearer ', // Include your token here
//         'name': name // Include user name in headers
//       })
//     });
//   }

//   addTask(todo: string): Observable<any> {
//     const storedUser = localStorage.getItem("loggedUser");
//     const name = storedUser ? JSON.parse(storedUser).sub : '';
//     const mail = storedUser ? JSON.parse(storedUser).email : '';

//     const data = {
//       name: name,
//       email: mail,
//       todo: todo
//     };

//     return this.http.post(`${this.baseUrl}/add`, data);
//   }

//   updateTask(id: number, title: string): Observable<any> {
//     const storedUser = localStorage.getItem("loggedUser");
//     const name = storedUser ? JSON.parse(storedUser).sub : '';
//     const mail = storedUser ? JSON.parse(storedUser).email : '';

//     const data = {
//       id,
//       username: name,
//       mail: mail,
//       title: title
//     };
//     return this.http.post(`${this.baseUrl}/update`, data);
//   }

//   deleteTask(id: number): Observable<any> {
//     return this.http.post(`${this.baseUrl}/delete`, { id: id });
//   }
// }

