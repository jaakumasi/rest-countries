import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
  signal,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Country } from '../../../../shared/interfaces';
import { BorderCountriesComponent } from './border-countries/border-countries.component';
import { FetchCountriesListService } from '../../../../shared/services/fetch-countries-list/fetch-countries-list.service';

@Component({
  selector: 'app-country-details',
  standalone: true,
  imports: [CommonModule, BorderCountriesComponent],
  templateUrl: './country-details.component.html',
  styleUrl: './country-details.component.scss',
  providers: [FetchCountriesListService],
})
export class CountryDetailsComponent implements OnInit {
  state$ = inject(Store).select('toggleThemeReducer');
  fetchCountries = inject(FetchCountriesListService);

  @Input() details?: Country;
  @Output() closeDetailsViewEvent = new EventEmitter<null>();
  @Output() updateSelectedCountryDetailsEvent = new EventEmitter<Country>();
  flag!: string;
  countryName!: string;
  currencies!: string;
  languages!: string;
  nativeName!: string;
  population!: number;
  region!: string;
  subregion!: string;
  capital!: string;
  topLevelDomain!: string;
  isLoading = signal<boolean>(false);
  detailsStack: Country[] = [];

  onStackInit() {
    this.detailsStack.push(this.details!);
  }

  ngOnInit(): void {
    this.onStackInit();
    this.onInit();
    console.log('stack: ', this.detailsStack);
  }

  onInit() {
    /* get the top details obj from the stack */
    const detailsObj = this.detailsStack[this.detailsStack.length - 1];

    /* currencies */
    const currencyCodes = Object.keys(detailsObj.currencies);
    const currencyList = currencyCodes.map((currencyCode) => {
      // @ts-ignore
      return detailsObj.currencies[currencyCode].name;
    });
    this.currencies = currencyList.join(', ');

    /* languages */
    const languages = Object.values(detailsObj.languages);
    this.languages = languages.join(', ');

    /* native name */
    const nativeNames = Object.keys(detailsObj.name.nativeName);
    let nativeNameCode = '';
    for (let i = 0; i < nativeNames.length; i++) {
      nativeNameCode = knownNativeNames.find(
        (kn_name) => kn_name == nativeNames[i]
      )!;
      if (nativeNameCode) break;
    }

    this.nativeName =
    detailsObj.name.nativeName[nativeNameCode].common ?? 'None';
    
    /* other straightforward details */
    this.countryName = detailsObj.name.common;
    this.flag = detailsObj.flags.svg!;
    this.population = detailsObj.population;
    this.region = detailsObj.region;
    this.subregion = detailsObj.subregion;
    this.capital = detailsObj.capital;
    this.topLevelDomain = detailsObj.tld;
  }

  onPushDetails(details: Country) {
    this.detailsStack.push(details);
    console.log('stack: ', this.detailsStack);
  }

  onUpdateDetails(borderCountry: string) {
    this.isLoading.set(true);
    this.fetchCountries.getBorderCountryDetails(borderCountry).subscribe({
      next: (details: Object) => {
        this.details = details as Country;
        this.isLoading.set(false);
        /* push selected border country to top of details stack */
        this.onPushDetails(details as Country);
        /* update the details with the details object at teh top of the stack */
        this.onInit();
        this.updateSelectedCountryDetailsEvent.emit(details as Country);
      },
    });
  }

  /* 
    keep popping details stack when the back button is clicked
    until down to one element, then return to countires list view
  */
  onPopDetails() {
    if (this.detailsStack.length > 1) {
      this.detailsStack.pop();
      this.onInit();
    } else this.closeDetailsViewEvent.emit();
  }

  saveSession() {}
}

const knownNativeNames = [
  'ron',
  'eng',
  'fra',
  'nau',
  'por',
  'spa',
  'sqi',
  'niu',
  'pau',
  'ara',
  'som',
  'msa',
  'mlg',
  'ber',
  'mey',
  'ell',
  'tur',
  'gle',
  'grn',
  'sin',
  'tam',
  'afr',
  'nbl',
  'nso',
  'sot',
  'ssw',
  'tsn',
  'tso',
  'ven',
  'xho',
  'zul',
  'hrv',
  'cal',
  'cha',
  'kin',
  'srp',
  'tvl',
  'nep',
  'bar',
  'nfr',
  'sag',
  'fij',
  'hif',
  'nno',
  'nob',
  'smi',
  'lav',
  'kaz',
  'rus',
  'swe',
  'tuk',
  'bul',
  'smo',
  'tkl',
  'dzo',
  'aze',
  'swa',
  'mlt',
  'ces',
  'slk',
  'nld',
  'pap',
  'uzb',
  'zho',
  'mkd',
  'deu',
  'ukr',
  'fin',
  'bos',
  'fas',
  'tir',
  'lit',
  'pov',
  'fil',
  'bis',
  'aym',
  'que',
  'khm',
  'bwg',
  'kck',
  'khi',
  'ndc',
  'nde',
  'nya',
  'sna',
  'toi',
  'zib',
  'nrf',
  'kir',
  'hye',
  'cnr',
  'kal',
  'hmo',
  'tpi',
  'hin',
  'mon',
  'mya',
  'kor',
  'nor',
  'bel',
  'pol',
  'gsw',
  'ita',
  'roh',
  'kon',
  'lin',
  'dan',
  'ltz',
  'fao',
  'slv',
  'tha',
  'ton',
  'lat',
  'run',
  'mah',
  'glv',
  'hat',
  'prs',
  'pus',
  'heb',
  'pih',
  'rar',
  'lao',
  'gil',
  'jam',
  'cat',
  'crs',
  'urd',
  'amh',
  'ben',
  'mri',
  'nzs',
  'zdj',
  'bjz',
  'hun',
  'isl',
  'tgk',
  'her',
  'hgm',
  'kwn',
  'loz',
  'ndo',
  'tet',
  'mfe',
  'div',
  'ind',
  'lua',
  'est',
  'vie',
  'kat',
  'arc',
  'ckb',
  'jpn',
];
