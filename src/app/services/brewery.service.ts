import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators'
import { Brewery } from '../interfaces/brewery.interface';
import { FavoritesService } from './favorites.service';

@Injectable({
  providedIn: 'root'
})
export class BreweryService {
  favoritesIds: number[] = []; // will be used to compare the api response to change the favorite bools as needed
  // State Management for List of Breweries returned by API call
  private readonly _breweries = new BehaviorSubject<Brewery[]>([]); // Behavior Subject
  readonly breweries$ = this._breweries.asObservable(); // Observable

  // Getter will return the last value emitted in _breweries subject
  private get breweries(): Brewery[] { 
    return this._breweries.getValue();
  }

  // Assigning a value to this.breweries will push it onto the observable 
  // and down to all of its subscribers (ex: this.breweries = [])
  private set breweries(val: Brewery[]) {
    this._breweries.next(val);
  }

  

  constructor(private http: HttpClient, private favoriteService: FavoritesService) { 
    this.favoriteService.favoritesList$.subscribe(v => {
      console.log("This is the list of favorites:");
      this.favoritesIds = v.map(b => b.id)
    })
  }


  getBreweries (search: string) {
    this.http.get(`https://api.openbrewerydb.org/breweries/search?query=${search}`)
    .pipe(
      map((res: Brewery[]) => res.map((brewery: Brewery) =>({
        id: brewery.id,
        name: brewery.name,
        brewery_type: brewery.brewery_type,
        street: brewery.street,
        city: brewery.city,
        state: brewery.state,
        postal_code: brewery.postal_code,
        country: brewery.country,
        longitude: brewery.longitude,
        latitude: brewery.latitude,
        phone: brewery.phone,
        website_url: brewery.website_url,
        updated_at: brewery.updated_at,
        favorite: false // will map through favoriteIds and change any specific ones to true if they are favorited
      }) 
      )),
      map(response => response.map(b => { // checks if user already had added a returned brewery to their favorites

        if(this.favoritesIds.includes(b.id)) {
          b.favorite = true;  // changes any previously favorited breweries to true
        }
        return b;
      }))
      ).subscribe((res) => {
        this.breweries = res;
        console.log("subscribe function in breweryService is called");
        
        
      })
  }
  

  
}

