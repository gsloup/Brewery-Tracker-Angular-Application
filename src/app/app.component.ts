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
    this.userService.checkStorage(); // set user stored in local storage
    this.userService.user$.subscribe((name: string) => this.username = name); // subscribes to behavior subject to get current username
  }

  logout() {
    this.userService.logout();
  }
}
