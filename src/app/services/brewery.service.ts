import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, retry } from 'rxjs/operators'
import { Brewery } from '../interfaces/brewery.interface';

@Injectable({
  providedIn: 'root'
})
export class BreweryService {

  // Creates an instance of a behavior subject
  private readonly _breweries = new BehaviorSubject<Brewery[]>([]);

  // Make a subsequent observable
  readonly breweries$ = this._breweries.asObservable();

  // Getter will return the last value emitted in _breweries subject
  private get breweries(): Brewery[] {
    return this._breweries.getValue();
  }

  // Assigning a value to this.breweries will push it onto the observable 
  // and down to all of its subscribers (ex: this.breweries = [])
  private set breweries(val: Brewery[]) {
    this._breweries.next(val);
  }

  //private readonly _favoritesList

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

