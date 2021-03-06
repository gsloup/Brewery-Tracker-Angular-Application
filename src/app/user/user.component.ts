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

  // Image asset names that will show random pic in user's favorites cards
  iconFilenames = ['001-beer-1', '002-beer-bottle', '003-beer-box', '004-wheat', '005-beer-can', 
      '006-bottle-cap', '007-beer', '008-barrel', '009-bar', '010-corkscrew'];
  
  constructor(private favoritesService: FavoritesService, private userService: UserService) { }

  ngOnInit(): void {
    // Subscribe to user
    this.userService.user$.subscribe(res =>{ 

      this.user = res ? res['username'] : null;
    });
    // Subscribe to favorites
    this.favoritesService.favoritesByUser();
    this.favoritesService.favoritesList$.subscribe((res)=> {
      this.favoritesList = res;
    });
  }

  getIconFilename(idx: number): string { // Used to add brew icons from assets folder
    let iconIndex: number = idx;
    if (idx > 9) { // grabs the last index of a number > 9 and uses that value
      iconIndex = parseInt(idx.toString().split("").reverse()[0]);
    }
    return (`../../assets/brewIcons/${this.iconFilenames[iconIndex]}.svg`);
  }

  removeFavorite(id){
    this.favoritesService.removeFavorite(id);
  }
}
