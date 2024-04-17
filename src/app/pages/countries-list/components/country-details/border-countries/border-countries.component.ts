import { Component, Input, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SharedState } from '../../../../../shared/store/store.state';
import { CommonModule } from '@angular/common';
import { Country } from '../../../../../shared/interfaces';

@Component({
  selector: 'app-border-countries',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './border-countries.component.html',
  styleUrl: './border-countries.component.scss',
})
export class BorderCountriesComponent implements OnInit {
  state$: Observable<SharedState> = inject(Store).select('toggleThemeReducer');

  @Input() details!: Country;

  currencies!: string;
  languages!: string;

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
}
