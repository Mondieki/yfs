import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateText'
})
export class TruncateTextPipe implements PipeTransform {

  transform(value: string, limit: number): string {
    if (!value) return '';
    let actualLimit = limit > 0 ? limit : 160; // default limit if not provided or invalid

    return value.length > actualLimit ? value.substring(0, actualLimit) + '...' : value;
  }

}
