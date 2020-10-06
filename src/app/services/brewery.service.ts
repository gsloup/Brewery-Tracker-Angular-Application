import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, retry } from 'rxjs/operators'
import { Brewery } from '../interfaces/brewery.interface';

@Injectable({
  providedIn: 'root'
})
export class BreweryService {

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
  // ------------------------------------------------------------------

  // State Management for List of Favorites
  private readonly _favoritesList = new BehaviorSubject<Brewery[]>([]); // behavior subject
  readonly favoritesList$ = this._favoritesList.asObservable(); // Observable
  
  private get favoritesList(): Brewery[] { // Getter
    return this._favoritesList.getValue();
  }

  private set favoritesList(val: Brewery[]) { // Setter
    this._favoritesList.next(val);
  }
  //--------------------------------------------------------------------

  constructor(private http: HttpClient) { }

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
        favorite: brewery.favorite
      }) 
      )) ).subscribe(res => this.breweries = res)
  }

  
}

