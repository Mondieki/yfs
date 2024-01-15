import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function userNameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        // Regular expression to match strings that start or end with whitespace
        const startOrEndWithWhitespace = /^\s+|\s+$/;

        // Regular expression to match only whitespace and special characters
        const onlyWhitespaceAndSpecialChars = /^[ \s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;

        // Check if the control value starts or ends with whitespace
        const hasWhitespaceAtStartOrEnd = startOrEndWithWhitespace.test(control.value);

        // Check if the control value contains only whitespace and special characters
        const hasOnlyWhitespaceAndSpecialChars = onlyWhitespaceAndSpecialChars.test(control.value);

        if (hasWhitespaceAtStartOrEnd || hasOnlyWhitespaceAndSpecialChars) {
            // Return the error object if any of the validations fail
            return { invalidName: true };
        }
        // Return null if the validation passes
        return null;
    };
}
