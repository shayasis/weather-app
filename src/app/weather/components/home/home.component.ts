import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public weatherSearchForm!: FormGroup;
  cityList: string[] = [];
  fiveDays: string[] = ['111', '222', '333', '444', '555'];
  filteredOptions: string[] = [];

  public cityDataList: any;
  public locationKey: string = '';

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
        data.map((item: any) => {
          console.log("item.key", item.Key);
          this.locationKey = item.Key;
          return item;
        });

        console.log("getAutocomplete", data);
      });

    this.apiService.getCurrentConditions(this.locationKey)
      .subscribe((data: any) => {
        console.log("conditionDataList", data);
      });

    this.apiService.getFiveDaysforecasts(this.locationKey)
      .subscribe((data: any) => {
        console.log("getFiveDays", data);
      });
  }
}


