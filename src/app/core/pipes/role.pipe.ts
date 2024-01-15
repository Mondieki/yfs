import { Pipe, PipeTransform } from '@angular/core';
import { ROLES } from '../consts/_roles';

@Pipe({
  name: 'role'
})
export class RolePipe implements PipeTransform {

  transform(value: string): string {
    return this.getNameFromID(value);
  }

  getNameFromID(id: string) {
    if (!Array.isArray(ROLES)) {
      // Handle the case where ROLES is not an array
      console.error('ROLES is not an array');
      return '';
    }

    const role = ROLES.find(method => method.id === id);
    return role ? role.name : '';
  }
}
