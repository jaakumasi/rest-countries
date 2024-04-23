import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Country } from '../../../../../shared/interfaces';
import { SharedState } from '../../../../../shared/store/store.state';
import { FetchCountriesListService } from '../../../../../shared/services/fetch-countries-list/fetch-countries-list.service';

@Component({
  selector: 'app-border-countries',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './border-countries.component.html',
  styleUrl: './border-countries.component.scss',
  providers: [FetchCountriesListService],
})
export class BorderCountriesComponent implements OnInit {
  state$: Observable<SharedState> = inject(Store).select('toggleThemeReducer');

  @Input() details!: Country;
  @Output() emitBorderCountryCode = new EventEmitter<string>();

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

  onBorderCountry(borderCountry: string) {
    this.emitBorderCountryCode.emit(borderCountry);
  }
}
