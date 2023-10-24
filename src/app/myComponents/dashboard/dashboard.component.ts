import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnChanges, OnInit {
  @Input() cityInputFromSearch: string = '';

  ngOnChanges(changes: SimpleChanges) {
    if (changes['cityInputFromSearch']) {
      this.fetchWeather(this.cityInputFromSearch);
    }
  }

  ngOnInit() {
    this.fetchWeather('');
  }

  weatherIcons: any = {
    sunny: 'https://cdn-icons-png.flaticon.com/128/4814/4814268.png',
    cloudy: 'https://cdn-icons-png.flaticon.com/128/704/704845.png',
    windy: 'https://cdn-icons-png.flaticon.com/128/6631/6631365.png',
    rainy: 'https://cdn-icons-png.flaticon.com/128/4150/4150897.png',
    haze: 'https://cdn-icons-png.flaticon.com/128/9361/9361636.png',
  };

  weather: {}[] = [];
  cityname: string = '';
  weatherIcon: string =
    'https://cdn-icons-png.flaticon.com/128/4814/4814268.png';
  temprature: number = 0;
  tempratureMin: number = 0;
  tempratureMax: number = 0;
  feels_like: number = 0;
  description: string = '';
  constructor() {}

  fetchWeather(city: string) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${
        city || localStorage.getItem('lastSearch')
      }&appid=aa933ef4c19b1f02f668c3f54c35d52b`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.main) {
          console.log(data);
          if (city) {
            localStorage.setItem('lastSearch', city);
          }
          this.weather = data.weather;
          this.cityname = data.name;
          this.tempratureMax = +(data.main.temp_max - 273.15).toFixed(2);
          this.tempratureMin = +(data.main.temp_min - 273.15).toFixed(2);
          this.feels_like = +(data.main.feels_like - 273.15).toFixed(2);
          this.temprature = +(data.main.temp - 273.15).toFixed(2);
          this.description = data.weather[0].description.toUpperCase();
          if (data.weather[0].main[0] == 'H') {
            this.weatherIcon = this.weatherIcons['haze'];
          } else if (
            data.weather[0].main[0] == 'S' ||
            data.weather[0].main == 'Clear'
          ) {
            this.weatherIcon = this.weatherIcons['sunny'];
          } else if (data.weather[0].main[0] == 'C') {
            this.weatherIcon = this.weatherIcons['cloudy'];
          } else if (data.weather[0].main[0] == 'R') {
            this.weatherIcon = this.weatherIcons['rainy'];
          } else {
            this.weatherIcon = this.weatherIcons['windy'];
          }

          console.log(this.weatherIcon);
          return;
        } else {
          alert('No Such City Found');
        }
      })
      .catch((err) => {
        alert('No Such City Found');
      });
  }
}
