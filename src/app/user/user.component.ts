import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../services/favorites.service';
import { Brewery } from '../interfaces/brewery.interface';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  favoritesList: Array<Brewery> = [];

  constructor(private favoritesService: FavoritesService) { }

  ngOnInit(): void {
    // Favorites List 
    this.favoritesService.favoritesList$.subscribe((res)=> {
      console.log(`this is the favoritesService ${res}`);

    this.favoritesList = res;
    })
  }

}
