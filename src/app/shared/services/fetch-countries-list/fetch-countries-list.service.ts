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

  getInitialCountriesList(): Observable<Country[]> {
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

  getFilteredByRegionCountriesList(region: string): Observable<Country[]> {
    // @ts-ignore
    return this.http.get(
      `${REST_COUNTRIES_API}/region/${region}?fields=${this.filteredResponseFieldsString}`
    );
  }

  getCountryQueryList(query: string): Observable<Country[]> {
    //@ts-ignore
    return this.http.get(
      `${REST_COUNTRIES_API}/name/${query}?fields=${this.filteredResponseFieldsString}`
    );
  }
}
