import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WeatherInfo } from 'src/app/shared/Interfaces/weather-info.Interface';
import { ApiService } from 'src/app/shared/services/api.service';
import { MockApiService } from 'src/app/shared/services/mockApi.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @Output() mode = new EventEmitter<boolean>();
  setDark = false;

  public weatherSearchForm!: FormGroup;
  cityList: string[] = [];
  dailyForecastsList: any[] = [];
  filteredOptions: string[] = [];

  public cityDataList: any;
  public locationKey: string = '';
  public weatherInfo:WeatherInfo = <WeatherInfo>{};

  constructor(private formBuilder: FormBuilder,
    public apiService: ApiService,
    public mockApiService: MockApiService) { }

  ngOnInit(): void {
    this.getCityList();
    this.setForm();


    this.weatherSearchForm.valueChanges.subscribe(res => {
      this._filter(res)
    })
  }

  setForm() {
    this.weatherSearchForm = this.formBuilder.group({
      location: ['']
    });
  }

  getCityList() {
    this.mockApiService.getCity()
      .subscribe((data: any) => {
        console.log({ data });
        this.cityList = data.map((item: any) => {
          return item.LocalizedName;
        });
        this.filteredOptions = this.cityList;
      });
  }

  private _filter(value: { location: string }) {
    if (value.location.length) {
      this.filteredOptions = this.cityList.filter(cityList => cityList.toLowerCase().includes(value.location));
      return;
    }
    this.filteredOptions = this.cityList
  }

  // sendToAPI(formValues: any) {
  //   this.apiService.getAutocomplete(formValues.location)
  //     .subscribe((data: any) => {
  //       data.map((item: any) => {
  //         console.log("item.key", item.Key);
  //         this.weatherInfo.cityName = item.LocalizedName;
  //         this.fiveDaysForecasts(item.Key);
  //         this.currentConditions(item.Key);
  //         this.locationKey = item.Key;
  //         return item;
  //       });

  //       console.log("getAutocomplete", data);
  //     });
  // }

  // currentConditions(locationKey: string) {
  //   this.apiService.getCurrentConditions(locationKey)
  //     .subscribe((data: any) => {
  //       console.log("conditionDataList", data);
  //     });
  // }
  // fiveDaysForecasts(locationKey: string) {
  //   this.apiService.getFiveDaysforecasts(locationKey)
  //     .subscribe((data: any) => {
  //       console.log("getFiveDays", data);
  //     });
  // }



  sendToAPI(formValues: any) {
    this.mockApiService.getAutocomplete()
      .subscribe((data: any) => {
        console.log('GetAutocomplet res - ', data);
        data.map((item: any) => {
          // console.log("item.key", item.Key);
          this.weatherInfo.cityName = item.LocalizedName;
          this.currentConditions(item.Key);
          this.fiveDaysForecasts(item.Key);
          this.locationKey = item.Key;
          return item;
        });

        // console.log("getAutocomplete", data);
      });
  }

  currentConditions(locationKey: string) {
    this.mockApiService.getCurrentConditions()
      .subscribe((data: any) => {
        data.map((item: any) => {
          this.weatherInfo.temperature = item.Temperature.Metric.Value;
          this.weatherInfo.weatherText = item.WeatherText;
          return item;
        });
        //  console.log("conditionDataList", data);
      });
  }
  fiveDaysForecasts(locationKey: string) {
    this.mockApiService.getFiveDaysforecasts()
      .subscribe((data: any) => {
        data.DailyForecasts.map((item: any) => {
        // console.log("item", item);
          this.dailyForecastsList.push(item);
          this.dailyForecastsList = this.dailyForecastsList.slice(0, 5);
          this.weatherInfo.temperature = item.Temperature.Minimum.Value;
          this.weatherInfo.weatherText = item.Day.IconPhrase;
          
    
        });
        console.log("getFiveDays", data);
        console.log(" this.dailyForecastsList", this.dailyForecastsList);
        
      });
  }

}


