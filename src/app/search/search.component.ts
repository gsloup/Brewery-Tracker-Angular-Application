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


  dataSource: MatTableDataSource<Brewery>;
  columnsToDisplay = ['name', 'city', 'state', 'favorite']; 
  expandedElement: Brewery | null;


  constructor(private breweryService: BreweryService) { }

  ngOnInit(): void { 
    this.breweryService.breweries$.subscribe((res)=> {
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
}



      
  

  

  



 


