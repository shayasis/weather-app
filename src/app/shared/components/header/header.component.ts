import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() mode = new EventEmitter<boolean>();

  setDark = false;
  constructor() { }

  ngOnInit(): void {
  }

  onChangeToggle() {
    this.setDark = !this.setDark;
    this.mode.emit(this.setDark);
    console.log(this.setDark);
  }

}
