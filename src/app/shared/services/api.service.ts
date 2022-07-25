import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  getAutocomplete(location:any){
    return this.http.get(
      environment.AUTOCOMPLETE_URL+'?apikey='+environment.ACCESS_KEY+'&q='+location
    );
  }

  getCurrentConditions(locationKey:string){
    return this.http.get(
      environment.CURRENT_CONDITIONS_URL+locationKey+'?apikey='+environment.ACCESS_KEY
    );
  }

  getFiveDaysforecasts(locationKey:string){
    return this.http.get(
      environment.FIVE_DAYS_URL+locationKey+'?apikey='+environment.ACCESS_KEY
    );
  }
  
  
}
