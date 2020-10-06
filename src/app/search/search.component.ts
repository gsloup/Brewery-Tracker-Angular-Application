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
  animations: [
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
  columnsToDisplay = ['name', 'city', 'state', 'favorite']; 
  expandedElement: Brewery | null;


  constructor(private breweryService: BreweryService, private favoritesService: FavoritesService) { }

  ngOnInit(): void { 
    // Breweries List
    this.breweryService.breweries$.subscribe((res)=> { 
      console.log("This is the list of breweries returned by API:");
      console.log(res);
      
      this.breweries = res;
      this.dataSource = new MatTableDataSource(this.breweries);
      this.dataSource.paginator = this.paginator;
      })
    
    // Favorites List 
    this.favoritesService.favoritesList$.subscribe((res)=> {
      console.log(`this is the favoritesService ${res}`);
      
      this.favoritesList = res;
    })
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  

  getBreweries () { // temp placeholder omaha for testing
    const searchBox = document.getElementById("search");
    
    this.breweryService.getBreweries(searchBox['value'])
    
  }

  updateFavoritesList(element) {
    if (element.favorite) {
      // add to list of favorites
      this.favoritesService.addFavorite(element);

    }
    else {
      // remove from list of favorites
      this.favoritesService.removeFavorite(element.id);

 

    }
  }
}