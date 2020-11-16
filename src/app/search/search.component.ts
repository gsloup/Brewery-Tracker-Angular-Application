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
  faveIds: Array<number> =[]

  constructor(private breweryService: BreweryService, private favoritesService: FavoritesService) { }

  ngOnInit(): void { 
    this.favoritesService.favoritesList$.subscribe((res)=> {
      console.log(`this is the favoritesService ${res}`);
      
      // Remove out the brewery IDs and have this.favoriteList be an array of those ids
      // In the template for the favorite checkbox IF the id is included in the favoritesList, have it checked, otherwise, don't
      this.favoritesList = res;
    })
    // Breweries List
    this.favoritesService.favoritesIds$.subscribe(v=> this.faveIds = v);
    this.breweryService.breweries$.subscribe((res)=> { 
      console.log("This is the list of breweries returned by API:");
      console.log(res);
      
      //this.breweries = res //.map(v=> v.favorite = this.favoritesList.contains(v.id)); // CHANGE
      this.breweries = res.map(v =>{
        v.favorite  =  this.faveIds.includes(v.id) ? true : false // if favorite is true
        return v;
      })
      this.dataSource = new MatTableDataSource(this.breweries);
      this.dataSource.paginator = this.paginator;
      })
    
    // Favorites List 

    
    this.favoritesService.favoritesByUser();
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
    console.log(element)
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