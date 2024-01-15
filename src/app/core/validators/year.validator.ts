import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function YearValidator(minYear?: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    const currentYear = new Date().getFullYear();

    if (value && (isNaN(value) || (minYear !== undefined && value < minYear) || value > currentYear || value.toString().length !== 4)) {
      return { 'invalidYear': true };
    }

    return null;
  };
}
