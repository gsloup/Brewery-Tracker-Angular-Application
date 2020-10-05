import { HttpClient } from '@angular/common/http';
import { identifierModuleUrl } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators'
import { Brewery } from '../interfaces/brewery.interface';

@Injectable({
  providedIn: 'root'
})
export class BreweryService {

  constructor(private http: HttpClient) { }

  getBreweries (search: string) {
    return this.http.get(`https://api.openbrewerydb.org/breweries/search?query=${search}`)
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
        updated_at: brewery.updated_at

      }) 
      
      
      )) )
  }

}

