import { ValidatorFn, AbstractControl } from '@angular/forms';

export function minArrayLength(min: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;

    // Check if the value is an array and not null/undefined
    if (!Array.isArray(value) || value === null || value === undefined) {
      return { 'minArrayLength': { valid: false, reason: 'Value is not an array' } };
    }

    // Count non-empty, non-null, and non-undefined entries
    const count = value.filter(item => item !== null && item !== undefined && item !== '').length;

    // Check if the array has the minimum required length
    if (count >= min) {
      return null; // valid
    }

    return { 'minArrayLength': { valid: false, reason: `Minimum ${min} items required` } }; // invalid
  };
}
