import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Custom validator function
export function notEmptyNorWhitespace(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value || '';
        if (value.trim().length === 0) {
            // Return error if value is empty or only whitespace
            return { 'notEmptyNorWhitespace': true };
        }
        // Return null if no error
        return null;
    };
}
