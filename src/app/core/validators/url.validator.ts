import { AbstractControl, ValidatorFn } from '@angular/forms';

// Enum for URL types
export enum UrlType {
  URL = 'url',
  LINKEDIN = 'linkedin',
  TWITTER = 'twitter'
}

export function urlValidator(urlType: UrlType): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!control.value) {
      return null; // return null if no value
    }

    const urlPattern = /^(https?:\/\/)?([\w\d-]+\.)*[\w\d-]+\.\w{2,}(\/.*)?\/?$/;
    const linkedinPattern = /^https?:\/\/(www\.)?linkedin\.com\/(in\/[^\/]+|pub\/[^\/]+\/[^\/]+\/[^\/]+\/[^\/]+)\/?$/;
    const twitterPattern = /^https?:\/\/(www\.)?twitter\.com\/[A-Za-z0-9_]+\/?$/;

    let valid = false;
    switch (urlType) {
      case UrlType.URL:
        valid = urlPattern.test(control.value);
        break;
      case UrlType.LINKEDIN:
        valid = linkedinPattern.test(control.value);
        break;
      case UrlType.TWITTER:
        valid = twitterPattern.test(control.value);
        break;
    }

    return valid ? null : { 'invalidUrl': { value: control.value } };
  };
}

// Usage example in a form group
// this.formGroup = new FormGroup({
//     twitterUrl: new FormControl('', urlValidator(UrlType.TWITTER)),
//     linkedinUrl: new FormControl('', urlValidator(UrlType.LINKEDIN)),
//     anyUrl: new FormControl('', urlValidator(UrlType.URL))
// });
