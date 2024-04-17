import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  inject,
} from '@angular/core';
import { Country } from '../../../../shared/interfaces';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { BorderCountriesComponent } from './border-countries/border-countries.component';

@Component({
  selector: 'app-country-details',
  standalone: true,
  imports: [CommonModule, BorderCountriesComponent],
  templateUrl: './country-details.component.html',
  styleUrl: './country-details.component.scss',
})
export class CountryDetailsComponent implements AfterViewInit, OnInit {
  state$ = inject(Store).select('toggleThemeReducer');

  @Input() details!: Country;
  @Output() closeDetailsViewEvent = new EventEmitter<null>();
  currencies!: string;
  languages!: string;

  ngAfterViewInit(): void {
    console.log(this.details);
  }

  ngOnInit(): void {
    const currencyCodes = Object.keys(this.details.currencies);
    const currencyList = currencyCodes.map((currencyCode) => {
      // @ts-ignore
      return this.details.currencies[currencyCode].name;
    });
    this.currencies = currencyList.join(', ');

    const languages = Object.values(this.details.languages);
    this.languages = languages.join(', ');
  }

  onHideSelectedCountryDetails() {
    this.closeDetailsViewEvent.emit();
  }
}
