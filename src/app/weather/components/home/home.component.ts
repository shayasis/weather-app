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
  options: string[] = ['London', 'Two', 'Three'];
  fiveDays: string[] = ['111','222','333','444','555']
  filteredOptions!: Observable<string[]>;

  public cityDataList: any;
  public conditionDataList: any;
  public fiveDaysDataList: any;

  public locationkey: string = '55489'

  constructor(private formBuilder: FormBuilder,
    public apiService: ApiService) { }

  ngOnInit(): void {
    this.setForm();

    this.filteredOptions = this.weatherSearchForm.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  setForm(){
    this.weatherSearchForm = this.formBuilder.group({
      location: ['']
    });
  }
  private _filter(value: string): string[] {
    const filterValue = value.toString();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  sendToAPI(formValues: any) {
    this.apiService.getAutocomplete(formValues.location)
      .subscribe((data: any) => {
        this.cityDataList = data;
        this.cityDataList.map((item:any) => {
          console.log("item.key",item.key);
        });
    
        console.log("cityDataList", this.cityDataList);
      });

    this.apiService.getCurrentConditions(this.locationkey)
      .subscribe((data: any) => {
        this.conditionDataList = data;
        console.log("getCondition", this.conditionDataList);
      });

    this.apiService.getFiveDaysforecasts(this.locationkey)
      .subscribe((data: any) => {
        this.fiveDaysDataList = data;
        console.log("getFiveDays", this.fiveDaysDataList);
      });
  }
}


