import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uppercaseIfShort'
})
export class UppercaseIfShortPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return value;
    }
    return value.length <= 3 ? value.toUpperCase() : value;
  }

}
