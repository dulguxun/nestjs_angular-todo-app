import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router'; // Import Router
import { Emitters } from '../emitters/emitters';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  message = '';
  loggedUser: any; // Define a variable to hold the logged user object

  constructor(
    private http: HttpClient,
    private router: Router // Inject Router
  ) {}

  ngOnInit(): void {
    // Parse the logged user object from localStorage
    this.loggedUser = JSON.parse(localStorage.getItem('loggedUser') || '{}');
    const token = localStorage.getItem('token');
    this.http.get('http://localhost:3000/users/profile', {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token
      })
    }).subscribe(
      (res: any) => {
        this.message = `Hi ${res.user.email}`;
        Emitters.authEmitter.emit(true);
      },
      err => {
        this.message = 'You are not logged in';
        Emitters.authEmitter.emit(false);
      }
    );
  }

  goToProfile(): void {
    if (this.loggedUser && this.loggedUser.sub) {
      this.http.get('http://localhost:3000/task', { responseType: 'text' }).subscribe(
        (res: any) => {
          console.log('Profile response:', res);
          this.message = res;
          this.router.navigate(['/todo']);
        },
        // Handle errors
        (error) => {
          console.error('Error while fetching profile:', error);
        }
      );
    }
  }
  
  
}
