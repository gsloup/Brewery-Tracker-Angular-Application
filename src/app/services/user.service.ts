import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private router: Router) { }

  login(username: string, password: string): void {
    let users = JSON.parse(localStorage.getItem('users')); // gets users array from local storage
    if (users === null) {  // If no lists of users exists, create an empty one
      users = [];
    }
    // Grab the username by the specific username & password arguments passed to the function
    let userByName = users.filter(u => u.username === username && u.password === password)[0];
    if (userByName) { // If that login info exists for an existing user...
      // set the username to state management or local storage

      this.router.navigate(['/search']); // reroutes from login screen to '/search'
    }
    else {
      // give the user an "incorrect" message
    }
  }

  
}
