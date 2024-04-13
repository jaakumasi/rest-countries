import { Injectable } from '@angular/core';
import { REQUIRED_COUNTRY_FIELDS } from '../../constants';

@Injectable({
  providedIn: 'root',
})
export class FilterResponseFieldsService {
  getFilteredResponseFields(): string {
    const fieldValues = Object.values(REQUIRED_COUNTRY_FIELDS);
    let filteredResponseFieldsString = '';
    fieldValues.forEach((field) => {
      filteredResponseFieldsString += `${field},`;
    });

    return filteredResponseFieldsString;
  }
}
