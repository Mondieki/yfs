import { AbstractControl, ValidatorFn } from '@angular/forms';
import { parsePhoneNumber } from 'awesome-phonenumber';

export function phoneNumberValidator(regionCode: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const pn = parsePhoneNumber( `${control.value}`, { regionCode: regionCode } )
    if(!regionCode) {
      return { code: true }
    }

    if(control.value && !pn.valid) {
      return { phone: true }
    }
    return null
  };
}
