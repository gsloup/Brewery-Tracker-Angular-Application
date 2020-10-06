import { Component, OnInit, ViewChild } from '@angular/core';
import { Brewery } from '../interfaces/brewery.interface';
import { BreweryService } from '../services/brewery.service';
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


  constructor(private breweryService: BreweryService) { }

  ngOnInit(): void { 
    this.breweryService.breweries$.subscribe((res)=> { // need to create a separate one for favoritesList
      console.log(res);
      
      this.breweries = res;
      this.dataSource = new MatTableDataSource(this.breweries);
      this.dataSource.paginator = this.paginator;
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

  updateFavoritesList(favBool: boolean, element) {
    console.log(favBool); // prints a boolean based on whether checkbox is ticked
    console.log(element)
    if (favBool) {
      // add to list of favorites
      this.favoritesList.push(element); 
      console.log(this.favoritesList);
      


    }
    else {
      // remove from list of favorites
    }

    

  }

}



      
  

  

  



 


