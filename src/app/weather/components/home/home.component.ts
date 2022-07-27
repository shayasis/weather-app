import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { WeatherInfo } from 'src/app/shared/Interfaces/weather-info.Interface';
import { ApiService } from 'src/app/shared/services/api.service';

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
  fiveDays: string[] = ['111', '222', '333', '444', '555'];
  filteredOptions: string[] = [];

  public cityDataList: any;
  public locationKey: string = '';
  public weatherInfo:WeatherInfo = <WeatherInfo>{};



  constructor(private formBuilder: FormBuilder,
    public apiService: ApiService) { }

  ngOnInit(): void {
    this.setCityList();
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

  setCityList() {
    this.apiService.getCity()
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

  sendToAPI(formValues: any) {
    this.apiService.getAutocomplete(formValues.location)
      .subscribe((data: any) => {
        console.log('GetAutocomplet res - ', data);
        data.map((item: any) => {
          console.log("item.key", item.Key);
          this.weatherInfo.cityName = item.LocalizedName;
          this.currentConditions(item.Key);
          this.fiveDaysforecasts(item.Key);
          return item;
        });
      });
  }

  currentConditions(locationKey: string){
    this.apiService.getCurrentConditions(locationKey)
    .subscribe((data: any) => {
      data.map((item: any) => {
        this.weatherInfo.temperature = item.Temperature.Metric.Value;
        this.weatherInfo.weatherText = item.WeatherText;
        return item;
      });
      console.log("conditionDataList", data);
    });
  }

  fiveDaysforecasts(locationKey: string){
    this.apiService.getFiveDaysforecasts(locationKey)
      .subscribe((data: any) => {
        console.log("getFiveDays", data);
      });
  }
}


