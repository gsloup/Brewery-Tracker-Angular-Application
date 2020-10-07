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
      // set the username to state management

      this.router.navigate(['/search']); // reroutes from login screen to '/search'
    }
    else {
      // give the user an "incorrect" message
    }
  }

  signup(username: string, password: string): void {
    let users = JSON.parse(localStorage.getItem('users')); // gets users array from local storage
    if (users === null) { // if no users exist, create an empty array called 'users'
      users = [];
    }
    let usersByName = users.filter(u => u.username === username); // filters out any matching usernames to the one in the argument
    if (usersByName.length === 0) { // if there are no users that go by the name passed in the method argument...
      users.push({username: username, password: password}) // add it to the users array
      
      localStorage.setItem('users', JSON.stringify(users)); // Sets new 'users' array to local storage

      this.login(username, password); // logs user in and will do the rerouting to '/search'
    }
    else {
      // give the user a "name already exists" message
    }
  }

  logout(): void {
    // clear username from state management
    
    this.router.navigate(['/login']); // reroutes to login page
  }

  
}
