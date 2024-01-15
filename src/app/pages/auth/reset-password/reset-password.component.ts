import { Component } from '@angular/core';
import { FormGroup, FormControl, NonNullableFormBuilder, Validators } from '@angular/forms';
import { EmailValidator } from 'src/app/core/validators/email.validator';
import { userNameValidator } from 'src/app/core/validators/name.validator';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {

  validateForm: FormGroup<{
    email: FormControl<string>;
  }>;

  passwordVisible = false;

  constructor(private fb: NonNullableFormBuilder) {
    this.validateForm = this.fb.group({
      email: ['', [Validators.required, EmailValidator]]
    })
  }

  ngOnInit(): void {
    // 
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
