import { Component, OnInit } from '@angular/core';
import { Brewery } from '../interfaces/brewery.interface';
import { BreweryService } from '../services/brewery.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  breweries: Array<Brewery> = []; 

  constructor(private breweryService: BreweryService) { }

  ngOnInit(): void {
    
      
    

  }

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
