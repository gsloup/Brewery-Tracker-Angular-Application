import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      const username = this.userService.user$; // grabs the current 'user' that is logged in
      console.log("this is the username in the userGuard");
      console.log(username);
<<<<<<< HEAD
      // console.log(username._value);
=======
>>>>>>> adding-auth-guards
      
      
      // If no one is logged in, route them to the 'login' page
      if (username === null) {  
        this.router.navigate(['/login']);
        return false;
      }

      // Allows a signed in person to access the home/search page of the app
      if (state.url === "/search") {
        return true;
      }

      // Makes sure whoever is logged in can only go to their user page
      if (username.toString().toLowerCase() != route.params.username.toLowerCase()) {
        this.router.navigate([`user/${username}`]);
      }

      return true;
  }
  
}
