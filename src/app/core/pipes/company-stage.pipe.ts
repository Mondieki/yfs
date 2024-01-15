import { Pipe, PipeTransform } from '@angular/core';
import { BUSINESS_STAGES } from '../consts/_business';

@Pipe({
  name: 'companyStage'
})
export class CompanyStagePipe implements PipeTransform {

  transform(value: string): string {
    return this.getNameFromID(value);
  }

  getNameFromID(id: string) {
    if (!Array.isArray(BUSINESS_STAGES)) {
      // Handle the case where BUSINESS_STAGES is not an array
      console.error('BUSINESS_STAGES is not an array');
      return '';
    }

    const name = BUSINESS_STAGES.find(method => method.id === id);
    return name ? name.name : '';
  }

}
