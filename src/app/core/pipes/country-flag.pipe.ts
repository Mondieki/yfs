import { Pipe, PipeTransform } from '@angular/core';
import { CountriesService } from '../services/countries.service';

@Pipe({
  name: 'countryToFlag'
})
export class CountryFlagPipe implements PipeTransform {

  constructor(private countryService: CountriesService) { }

  transform(value: string): any {
    return this.countryService.getIconByIso(value);
  }

}
