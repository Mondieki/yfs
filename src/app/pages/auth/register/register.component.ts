import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { getErrorMessageFromCode } from 'src/app/core/consts/_authErrors';

import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';
import { EmailValidator } from 'src/app/core/validators/email.validator';
import { userNameValidator } from 'src/app/core/validators/name.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  validateForm: FormGroup<{
    email: FormControl<string>;
    name: FormControl<string>;
    password: FormControl<string>;
  }>;

  passwordVisible = false;
  isLoading = false;

  constructor(
    private authService: AuthService,
    private fb: NonNullableFormBuilder,
    private message: NzMessageService,
    private router: Router,
    private userService: UserService) {

    this.validateForm = this.fb.group({
      email: ['', [Validators.required, EmailValidator]],
      name: ['', [Validators.required, userNameValidator(), Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    // 
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      this.isLoading = true;
      var form = this.validateForm.value;
      this.authService.createUserWithEmailAndPassword(`${form.email}`, `${form.password}`)
        .then((userCredential) => {

          delete form.password;
          
          this.showMessage('success', `Hey, ${form.name} 👋! Your account has been created.`);
          
          var user = {
            ID: userCredential.user.uid,
            ...form
          }
          this.userService.createUser(user)
            .then(() => {
              this.router.navigate(['/update-profile']);
              this.isLoading = false;
              this.showMessage('success', `Please fill in your profile.`);
            })
            .catch(err => this.showMessage('error', 'Your details could not be saved at the moment'))
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
