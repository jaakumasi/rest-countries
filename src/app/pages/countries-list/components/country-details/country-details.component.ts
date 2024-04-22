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
import { Country } from '../../../../shared/interfaces';
import { BorderCountriesComponent } from './border-countries/border-countries.component';

@Component({
  selector: 'app-country-details',
  standalone: true,
  imports: [CommonModule, BorderCountriesComponent],
  templateUrl: './country-details.component.html',
  styleUrl: './country-details.component.scss',
})
export class CountryDetailsComponent implements OnInit {
  state$ = inject(Store).select('toggleThemeReducer');

  @Input() details!: Country;
  @Output() closeDetailsViewEvent = new EventEmitter<null>();
  currencies!: string;
  languages!: string;
  nativeName!: string;

  ngOnInit(): void {
    /* currencies */
    const currencyCodes = Object.keys(this.details.currencies);
    const currencyList = currencyCodes.map((currencyCode) => {
      // @ts-ignore
      return this.details.currencies[currencyCode].name;
    });
    this.currencies = currencyList.join(', ');

    /* languages */
    const languages = Object.values(this.details.languages);
    this.languages = languages.join(', ');

    /* native name */
    const nativeNames = Object.keys(this.details.name.nativeName);
    let nativeNameCode = '';
    for (let i = 0; i < nativeNames.length; i++) {
      nativeNameCode = knownNativeNames.find(
        (kn_name) => kn_name == nativeNames[i]
      )!;
      if (nativeNameCode) break;
    }

    console.log(this.details.name.nativeName);
    this.nativeName =
      this.details.name.nativeName[nativeNameCode].common ?? 'None';
  }

  onHideSelectedCountryDetails() {
    this.closeDetailsViewEvent.emit();
  }
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
