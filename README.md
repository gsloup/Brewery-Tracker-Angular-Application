# Brewery Tracker Angular App

Link to the hosted project: https://brewery-finder.herokuapp.com/signup

This project made in Angular 10, using a MySQL database, and is hosted through Heroku.

## Features

- Safely sign up and create your own favorites page.
- Search and add your favorite breweries to your favorites page.
- See the relevant brewery data, where you may interact with their specific company data:
  1. Click on the company website to be routed to their page.
  2. Click on the address to pull up a Google Maps view of the brewery's location.
  3. Click on the phone number to call the brewery.
  
## Technical Details
- State management is handled via rxjs Behavior Subjects and Observables.
- Passwords are encrypted before stored in the MySQL database.
- SSL Certificate on web page for end-to-end encryption.
- Auth Guards in place to prevent unauthorized users from accessing certain url endpoints
- JSON Web Tokens used so that only authorized users may CRUD their brewery data.
- SQL queries have parameterized statements to help prevent SQL injections.
- Database config variables are safely hidden to those searching the source code.
- Angular Material Design used to make a clean UI/UX.
- Utilizes the Open Brewery DB API (https://www.openbrewerydb.org/).
- Responsive design for different screen sizes (not currently fully optimized for mobile screens).
