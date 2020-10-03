import { Component, OnInit } from '@angular/core';
import { BreweryService } from '../services/brewery.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  breweries: any; // temp declaration, change later

  constructor(private breweryService: BreweryService) { }

  ngOnInit(): void {
  }

  getBreweries (search='omaha') { // temp placeholder omaha for testing
    this.breweryService.getBreweries(search).subscribe(res=> this.breweries = res)
    console.log(this.breweries);
    // NOT SURE ON LIMITS OF HTTP RESPONSE, MAY NEED TO LIMIT RESULTS PER PAGE
    
  }



 

}
