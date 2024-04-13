import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { REST_COUNTRIES_API } from '../../constants';
import { Country } from '../../interfaces';
import { FilterResponseFieldsService } from '../filter-response-fields/filter-response-fields.service';
import { Observable, forkJoin, map, of } from 'rxjs';
import { response } from 'express';

@Injectable({
  providedIn: 'root',
})
export class FetchCountriesListService {
  http = inject(HttpClient);
  filteredResponseFieldsString = inject(
    FilterResponseFieldsService
  ).getFilteredResponseFields();

  initialCountries: string[] = [
    'germany',
    'usa',
    'brazil',
    'iceland',
    'afghanistan',
    'aland',
    'albania',
    'algeria',
  ];

  getInitialCountriesList() {
    // console.log('filtered fields: ', this.filteredResponseFieldsString);

    // this.initialCountries.forEach((country) => {
    //   this.http
    //     .get(
    //       `${REST_COUNTRIES_API}/name/${country}` //?fields=${this.filteredResponseFieldsString}`
    //     )
    //     .subscribe((response: any) => {
    //       console.log(response);

    //       if (!response.status) countriesData.push(response[0]);
    //     });
    // });

    const requests: Observable<any>[] = this.initialCountries.map((country) =>
      this.http.get(
        `${REST_COUNTRIES_API}/name/${country}?fields=${this.filteredResponseFieldsString}`
      )
    );

    return forkJoin(requests).pipe(
      map((responses) => {
        if (responses.length === 0) return [];

        return responses
          .filter((response) => response.status !== 404)
          .map((response) => response[0]);
      })
    );
  }
}
