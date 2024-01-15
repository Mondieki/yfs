import { Injectable } from '@angular/core';
import { COUNTRIES } from '../consts/_countries';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor() { }
  
  isoToFlag(isoCode: string): string {
    const OFFSET = 127397;
    return isoCode
      .toUpperCase()
      .split('')
      .map(char => String.fromCodePoint(char.charCodeAt(0) + OFFSET))
      .join('');
  }

  getIconByIso(iso_3166: string): string | undefined {
    const country = COUNTRIES.find(country => country.iso_3166 === iso_3166);
    return country ? country.icon : undefined;
  }
}
