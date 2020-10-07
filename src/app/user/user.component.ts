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
  breweryType: string = "";
  breweryName: string = "";
  websiteURL: string = "";
  street: string = '';
  city: string = '';
  state: string = '';
  zipCode: string = '';
  phone: string = '';
  latitude: string = '';
  longitude: string = '';

  constructor(private favoritesService: FavoritesService, private userService: UserService) { }

  ngOnInit(): void {
    // Favorites List 
    this.favoritesService.favoritesList$.subscribe((res)=> {
      console.log(`this is the favoritesService ${res}`);

    this.favoritesList = res;
    this.breweryType = this.favoritesList[0].brewery_type; // FIX INDEX POSITION
    this.breweryName = this.favoritesList[0].name;
    this.websiteURL = this.favoritesList[0].website_url;
    this.street = this.favoritesList[0].street;  
    this.city = this.favoritesList[0].city;
    this.state = this.favoritesList[0].state;
    this.zipCode = this.favoritesList[0].postal_code;
    this.phone = this.favoritesList[0].phone;
    this.latitude = this.favoritesList[0].phone;
    this.longitude = this.favoritesList[0].longitude;

    })

    // User Info
    this.userService.user$.subscribe(res =>{ 
      this.user = res;
    })
  }

}
