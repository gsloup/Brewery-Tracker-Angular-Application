import { Component, OnInit } from '@angular/core';
import { Brewery } from '../interfaces/brewery.interface';
import { BreweryService } from '../services/brewery.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

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
  breweries: Array<Brewery> = [{ // ADDED AN EXAMPLE RESPONSE TO WORK ON TABLE
    id: 530,
    name: "Diving Dog Brewhouse",
    brewery_type: "micro",
    street: "1802 Telegraph Ave",
    city: "Oakland",
    state: "California",
    postal_code: "94612-2110",
    country: "United States",
    longitude: "-122.2698881",
    latitude: "37.807739",
    phone: "5103061914",
    website_url: "http://www.divingdogbrew.com",
    updated_at: "2018-08-23T23:27:26.494Z"
  }]; 


  dataSource = this.breweries;
  columnsToDisplay = ['name', 'city', 'state', 'favorite']; 
  expandedElement: Brewery | null;


  constructor(private breweryService: BreweryService) { }

  ngOnInit(): void { }
  

  getBreweries () { // temp placeholder omaha for testing
    const searchBox = document.getElementById("search");
    
    this.breweryService.getBreweries(searchBox['value']).subscribe((res)=> {
      console.log(res);
      
      this.breweries = res;
      
      console.log(this.breweries); //RETURNS UNDEFINED...
      // NOT SURE ON LIMITS OF HTTP RESPONSE, MAY NEED TO LIMIT RESULTS PER PAGE
      console.log(this.breweries[0].name); // WILL LATER USE NG FOR TO ITERATE THROUGH BREWERY ARRAY
    
      })
    
  }
}



      
  

  

  



 


