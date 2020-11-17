import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { FavoritesService } from './favorites.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private router: Router, private _snackBar: MatSnackBar, private http: HttpClient, 
    private favoritesService: FavoritesService) { }

  // State Management
  private readonly _user = new BehaviorSubject<string>(null); 
  readonly user$ = this._user.asObservable(); 

  // Getter and Setter
  private get user() {             
    return this._user.getValue();
  }
  private set user(user: string) { 
    this._user.next(user);
  }


  login(username: string, password: string){
    this.http.post('/api/users/login', {username: username, password: password}).subscribe(res => {
      if (res['success']) {
        this.user = res['user'];
        
        localStorage.setItem('token', res["jwt"]); // Will be cleared when user logs out
        // Route user to search page
        this.router.navigate(['/search']);
      }
      // Give user appropriate message using a snack bar
      this._snackBar.open(res['msg'], null, {
        duration: 2500,
      });
    })  
  }

  signup(username: string, password: string){ 
    this.http.post('/api/users/signup', {username: username, password: password}).subscribe(res => {
      if (res['success']) {
        this.login(username, password); // automatically logs in new user if successfully signs up
      }
      // Give user appropriate message using a snack bar
      this._snackBar.open(res['msg'], null, { 
        duration: 3500,
      });
    })  
  }

  logout(){
    // Clears 'user' state management
    this.user = null;     
    // Remove JWT from local storage
    localStorage.removeItem('token'); 
    // Route user to login page
    this.router.navigate(['/login']);
  }
  
}
