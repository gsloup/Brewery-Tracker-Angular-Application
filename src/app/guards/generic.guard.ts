import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class GenericGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      return this.userService.user$.pipe(
        map((username: string) => {
          // route logged in users back to search page
          if (username !== null) {
            this.router.navigate(['/search']);
            return false;
          }
          // otherwise allow non-logged in users to access the page
          return true;
        })
      )
  }
  
}
