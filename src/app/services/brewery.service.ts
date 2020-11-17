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
  private readonly _breweries = new BehaviorSubject<Brewery[]>([]); 
  readonly breweries$ = this._breweries.asObservable(); 

  // Getter and Setter
  private get breweries(): Brewery[] { 
    return this._breweries.getValue();
  }
  private set breweries(val: Brewery[]) {
    this._breweries.next(val);
  }

  constructor(private http: HttpClient, private favoriteService: FavoritesService) {
    // Subscribe to favoritesList 
    this.favoriteService.favoritesList$.subscribe(v => {
      this.favoritesIds = v.map(b => b.id)
    })
    // Subscribe to favoritesIds
    this.favoriteService.favoritesIds$.subscribe(v=> this.favoritesIds = v.map(v=> v.breweryId))
  }

  // API call that maps incoming data to a "Brewery" object
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
        favorite: this.favoritesIds.includes(brewery.id) ? true : false // Map through favoriteIds and change favorited ones to 'true'
      }) 
      )),
      map(response => response.map(b => { 
        if(this.favoritesIds.includes(b.id)) {
          b.favorite = true;  // changes any previously favorited breweries to true
        }
        return b;
      }))
      ).subscribe((res) => {
        this.breweries = res;    
      })
  }
}

