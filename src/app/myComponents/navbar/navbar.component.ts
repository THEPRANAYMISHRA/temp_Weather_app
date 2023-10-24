import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  city: string = 'New Delhi';

  @Output() setcity: EventEmitter<string> = new EventEmitter();

  handleCitySubmit() {
    this.setcity.emit(this.city);
  }
}
