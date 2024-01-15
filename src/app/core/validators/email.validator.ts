import { AbstractControl } from '@angular/forms';

export function EmailValidator(control: AbstractControl): { [key: string]: boolean } | null {

  if (control.value && !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,24})+$/.test(control.value))) {
    return { invalidEmail: true }
  }

  return null;
}