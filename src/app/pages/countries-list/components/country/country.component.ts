import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-country',
  standalone: true,
  imports: [],
  templateUrl: './country.component.html',
  styleUrl: './country.component.scss',
})
export class CountryComponent {
  @Output() clickEvent = new EventEmitter<number>();
  @Input() countryIndex!: number;

  onCountryClick() {
    this.clickEvent.emit(this.countryIndex);
  }
}