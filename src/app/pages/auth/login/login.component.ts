import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { getErrorMessageFromCode } from 'src/app/core/consts/_authErrors';
import { AuthService } from 'src/app/core/services/auth.service';
import { EmailValidator } from 'src/app/core/validators/email.validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  validateForm: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
  }>;

  passwordVisible = false;
  isLoading = false;

  constructor(
    private authService: AuthService,
    private fb: NonNullableFormBuilder,
    private message: NzMessageService,
    private router: Router) {

    this.validateForm = this.fb.group({
      email: ['', [Validators.required, EmailValidator]],
      password: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    // 
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      this.authService.signInWithEmailAndPassword(`${this.validateForm.value.email}`, `${this.validateForm.value.password}`)
        .then((userCredential) => {
          this.isLoading = false;
          this.showMessage('success', `Welcome 👋!`);
          this.router.navigate(['/']);
        })
        .catch((error) => {
          this.isLoading = false;
          const errorCode = error.code;
          this.showMessage('error', getErrorMessageFromCode(errorCode));
        });
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  showMessage(type: string, msg: string) {
    this.message.create(type, msg, {
      nzDuration: 5000
    });
  }
}
