import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from '../services/user.service';


@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) { }

  // Will prevent non-signed in users from accessing the search or favorites pages
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      return this.userService.user$.pipe(
        map((username: string) => {
          // If no one is logged in, route them to the 'login' page
          if (username === null) {
            this.router.navigate(['/login']);
            return false;
          }
          // Allows a signed in person to access the home/search page of the app
          if (state.url === "/search") {
            return true;
          }
          return true;
        })
      )
  }
}
