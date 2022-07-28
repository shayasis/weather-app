import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'weather-app';

  setMode = false;

  receiveMode($event: any) {
    this.setMode = $event;
  }
}
