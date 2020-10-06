import { Injectable } from '@angular/core';
import { Brewery } from '../interfaces/brewery.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  // State Management for List of Favorites
  private readonly _favoritesList = new BehaviorSubject<Brewery[]>([]); // behavior subject
  readonly favoritesList$ = this._favoritesList.asObservable(); // Observable
  
  private get favoritesList(): Brewery[] { // Getter
    return this._favoritesList.getValue();
  }

  private set favoritesList(val: Brewery[]) { // Setter
    this._favoritesList.next(val);
  }

  addFavorite(obj: Brewery){
    this.favoritesList = [...this.favoritesList, obj]
  }

  removeFavorite(id){
    this.favoritesList = this.favoritesList.filter(b=> b.id !== id);
  }

  constructor() {
   }
}
