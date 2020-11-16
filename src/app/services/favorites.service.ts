import { Injectable } from '@angular/core';
import { Brewery } from '../interfaces/brewery.interface';
import { BehaviorSubject, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  // State Management for List of Favorites
  private readonly _favoritesList = new BehaviorSubject<Brewery[]>([]); // behavior subject
  readonly favoritesList$ = this._favoritesList.asObservable(); // Observable
  favoritesIds$ = this.favoritesList$.pipe(map((v: any[])=>
    v.map(f=> f.breweryId)
  ))

  // Getter and Setter
  private get favoritesList(): Brewery[] { 
    return this._favoritesList.getValue();
  }
  private set favoritesList(val: Brewery[]) { 
    this._favoritesList.next(val);
  }

  
  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {
  }

  // ADD FAVORITE
  addFavorite(brewery: Brewery) { 
    // Add jwt
    const token = localStorage.getItem('token');
    let jwtHeader = new HttpHeaders().append('Authorization', `jwt ${token}`)

    // Make the request
    this.http.post('/api/favorites/add', {brewery: brewery}, {headers: jwtHeader})
    .pipe(catchError(err => throwError('Invalid credentials, please try again')))
    .subscribe(res => {
      // Handle response and update state management as needed
      if (res['success']) {
        this.favoritesByUser(); // Retrieves the updated favorites list
      }
      // Give user appropriate message using a snack bar
      this._snackBar.open(res['msg'], null, {
        duration: 2000,
      });      
    }, err => console.log(err)) // Error function if the observable error-ed out
  }

  // REMOVE FAVORITE
  removeFavorite(id: number){
    // Add jwt
    const token = localStorage.getItem('token');
    let jwtHeader = new HttpHeaders().append('Authorization', `jwt ${token}`)

    this.http.delete(`/api/favorites/delete/${id}`, { headers: jwtHeader })
    .pipe(catchError(err => throwError('Invalid credentials, please try again')))
    .subscribe(res => {
      if (res['success']) {
        this.favoritesByUser(); // Retrieves the updated favorites list
      }
      // Give user appropriate message using a snack bar
      this._snackBar.open(res['msg'], null, {
        duration: 2000,
      });      
    }, err => console.log(err)) // Error function if the observable error-ed out
  }

  // GET ALL USER'S FAVORITES
  favoritesByUser(){
    // Add jwt
    const token = localStorage.getItem('token');
    let jwtHeader = new HttpHeaders().append('Authorization', `jwt ${token}`);

    this.http.get('/api/favorites/user', { headers: jwtHeader })
    .pipe(catchError(err => throwError('Invalid credentials, please try again')))
    .subscribe(res => {
      if (res['success']) {
        this.favoritesList = res['favorites'];
      }
    }, err => console.log(err)) // Error function if the observable error-ed out
  }

  // CLEAR FAVORITES
  clearFavorites(){ // Runs when logout() is called to reset state management
    this.favoritesList = [];
  }


}
