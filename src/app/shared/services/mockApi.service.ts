import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class MockApiService {
    numberOfCitys: number = 150;
    constructor(private http: HttpClient) { }

    getCity() {
        return this.http.get(
            environment.CITY_URL_MOCK
        );
    }

    getAutocomplete() {
        return this.http.get(
            environment.AUTOCOMPLETE_URL_MOCK
        );
    }

    getCurrentConditions() {
        return this.http.get(
            environment.CURRENT_CONDITIONS_URL_MOCK
        );
    }

    getFiveDaysforecasts() {
        return this.http.get(
            environment.FIVE_DAYS_URL_MOCK
        );
    }


}
