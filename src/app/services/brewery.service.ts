import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class BreweryService {

  constructor(private http: HttpClient) { }

  getBreweries (search: string) {
    return this.http.get(`https://api.openbrewerydb.org/breweries/search?query=${search}`)
    .pipe(
      retry(4) // API call has been shaky, so a retry has been necessary
    )
  }

}

