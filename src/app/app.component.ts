import { Component } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'brewery-tracker-angular-app';

  username: string;
  
  constructor(private userService: UserService) {
    // Subscribe to User
    this.userService.user$.subscribe((user: Object) => this.username = user ? user['username'] : null); 
  }

  logout() {
    this.userService.logout();
  }
}
