import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../services/favorites.service';
import { Brewery } from '../interfaces/brewery.interface';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  favoritesList: Array<Brewery> = [];
  user: string;

  constructor(private favoritesService: FavoritesService, private userService: UserService) { }

  ngOnInit(): void {
    // Favorites List Subscription
    this.favoritesService.favoritesList$.subscribe((res)=> {
      console.log(`this is the favoritesService ${res}`);

     this.favoritesList = res;

    })

    // User Info Subscription
    this.userService.user$.subscribe(res =>{ 
      this.user = res;
    })
  }

}
