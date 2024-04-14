import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Country } from '../../../../shared/interfaces';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-country',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './country.component.html',
  styleUrl: './country.component.scss',
})
export class CountryComponent {
  @Output() clickEvent = new EventEmitter<number>();
  @Input() countryIndex!: number;
  @Input() details!: Country;

  state$ = inject(Store).select('toggleThemeReducer');

  onCountryClick() {
    this.clickEvent.emit(this.countryIndex);
  }
}
