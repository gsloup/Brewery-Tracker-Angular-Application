import { Component, OnInit, ViewChild } from '@angular/core';
import { Brewery } from '../interfaces/brewery.interface';
import { BreweryService } from '../services/brewery.service';
import { FavoritesService } from '../services/favorites.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  animations: [ // Table expand animations in template
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class SearchComponent implements OnInit {
  breweries: Array<Brewery> = []; 
  favoritesList: Array<Brewery> = [];

  dataSource: MatTableDataSource<Brewery>;
  columnsToDisplay = ['name', 'city', 'state', 'favorite']; // Used in template table
  expandedElement: Brewery | null;  // Used in template table 
  faveIds: Array<number> =[]

  constructor(private breweryService: BreweryService, private favoritesService: FavoritesService) { }

  ngOnInit(): void { 
    this.favoritesService.favoritesList$.subscribe((res)=> {
      // Get user's favorites from state management
      this.favoritesList = res;
    })
    // Subscribe to data in state management
    this.favoritesService.favoritesIds$.subscribe(v=> this.faveIds = v);
    this.breweryService.breweries$.subscribe((res)=> { 
      // Map through the searched breweries and update the "favorite" checkbox with the user's favorites
      this.breweries = res.map(v =>{
        v.favorite  =  this.faveIds.includes(v.id) ? true : false // if favorite is true
        return v;
      })
      // Template table info for material design
      this.dataSource = new MatTableDataSource(this.breweries);
      this.dataSource.paginator = this.paginator;
      })
    
    // Favorites List
    this.favoritesService.favoritesByUser();
  }

  @ViewChild(MatPaginator) paginator: MatPaginator; // Used in template table

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator; // Used in template table
  }
  
  getBreweries() { 
    const searchBox = document.getElementById("search");
    this.breweryService.getBreweries(searchBox['value'])
  }

  updateFavoritesList(element) {
    if (!element.favorite) {
      // add to list of favorites
      this.favoritesService.addFavorite(element);
    }
    else {
      // remove from list of favorites
      this.favoritesService.removeFavorite(element.id);
    }
  }
}