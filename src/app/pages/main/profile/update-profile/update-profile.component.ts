import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { FormGroup, FormControl, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { parsePhoneNumber } from 'awesome-phonenumber';
import { NzMessageService } from 'ng-zorro-antd/message';
import { COUNTRIES } from 'src/app/core/consts/_countries';
import { ROLES } from 'src/app/core/consts/_roles';
import { SKILLS } from 'src/app/core/consts/_skills';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';
import { minArrayLength } from 'src/app/core/validators/minArrayLength';
import { phoneNumberValidator } from 'src/app/core/validators/phone.validator';
import { UrlType, urlValidator } from 'src/app/core/validators/url.validator';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {

  basicInfoForm!: FormGroup<{
    country: FormControl<string>;
    phoneNumber: FormControl<string>;
    phoneNumberPrefix: FormControl<string>;
    whatsapp: FormControl<string>;
    whatsappPhoneNumberPrefix: FormControl<string>;
  }>;

  bioForm: FormGroup<{
    bio: FormControl<string>;
    linkedin: FormControl<string>;
    twitter: FormControl<string>;
    url: FormControl<string>;
  }> = this.fb.group({
    bio: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(300)]],
    linkedin: ['', [urlValidator(UrlType.LINKEDIN)]],
    twitter: ['', [urlValidator(UrlType.TWITTER)]],
    url: ['', [urlValidator(UrlType.URL)]]
  });

  skillsForm!: FormGroup;

  basicInfoFormSubmitted = false;
  bioFormSubmitted = false;
  skillsFormSubmitted = false;

  countries = COUNTRIES;
  skills = SKILLS;
  roles = ROLES;

  current = 0;
  processing = false;

  user!: User;

  constructor(
    private authService: AuthService,
    private fb: NonNullableFormBuilder,
    private message: NzMessageService,
    private router: Router,
    private userService: UserService) { }

  ngOnInit(): void {
    this.authService.getUserAuthObject()
      .then((user: any) => {
        this.user = user;
      })
      .catch(err => {
        this.showMessage('error', `Something went wrong`);
        this.router.navigate(['/auth/login']);
      });

    this.basicInfoForm = this.fb.group({
      country: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      phoneNumberPrefix: ['', [Validators.required]],
      whatsapp: ['', [Validators.required]],
      whatsappPhoneNumberPrefix: ['', [Validators.required]]
    });

    this.skillsForm = this.fb.group({
      role: ['', [Validators.required]],
      skills: [[], minArrayLength(1)]
    });

    this.onPhonePrefixChange();
    this.onWhatsappPrefixChange();
  }

  pre(): void {
    this.current -= 1;
  }

  async next(): Promise<void> {
    if (this.current === 0) {
      this.current += await this.submitBasicInfoForm();
    }

    if (this.current === 1) {
      this.current += await this.submitBioInfoForm();
    }
  }


  done(): void {
    this.submitSkillsInfoForm();
  }

  async submitBasicInfoForm(): Promise<number> {
    this.basicInfoFormSubmitted = true;

    if (this.basicInfoForm.valid) {
      this.processing = true;
      var form = this.basicInfoForm.value;
      try {
        await this.userService.updateUser(this.user.uid, {
          country: form.country,
          phone: parsePhoneNumber(`${form.phoneNumber}`, { regionCode: form.phoneNumberPrefix }).number?.e164,
          whatsapp: parsePhoneNumber(`${form.whatsapp}`, { regionCode: form.whatsappPhoneNumberPrefix }).number?.e164
        });
        this.processing = false;
        return 1;
      } catch (err) {
        this.showMessage('error', `${err}`);
        return 0;
      }
    } else {
      Object.values(this.basicInfoForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      return 0;
    }
  }

  async submitBioInfoForm(): Promise<number> {
    this.bioFormSubmitted = true;

    if (this.bioForm.valid) {
      this.processing = true;
      try {
        await this.userService.updateUser(this.user.uid, {
          ...this.bioForm.value
        });
        this.processing = false;
        return 1;
      } catch (err) {
        this.showMessage('error', `${err}`);
        return 0;
      }
    } else {
      Object.values(this.bioForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      return 0;
    }
  }

  submitSkillsInfoForm() {
    this.skillsFormSubmitted = true;

    if (this.skillsForm.valid) {
      this.processing = true;
      this.userService.updateUser(this.user.uid, {
        ...this.skillsForm.value
      })
      .then(() => {
        this.processing = false;
        this.showMessage('success', `Your profile has been completed`);
        this.router.navigate(['/'])
      })
      .catch(err => {
        this.showMessage('error', `${err}`);
      });
    } else {
      Object.values(this.skillsForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  onPhonePrefixChange() {
    this.basicInfoForm.get('phoneNumberPrefix')?.valueChanges
      .subscribe((prefix) => {
        setTimeout(() => {
          if (prefix) {
            this.basicInfoForm.get('phoneNumber')?.setValidators([
              Validators.required,
              phoneNumberValidator(prefix)
            ]);
          } else {
            // Handle the case where prefix is null or undefined
            // Example: Set a default validator or clear the existing one
            this.basicInfoForm.get('phoneNumber')?.setValidators([
              Validators.required
              // You can add a default validator if needed
            ]);
          }
          this.basicInfoForm.get('phoneNumber')?.updateValueAndValidity();
        }, 500);
      });
  }

  onWhatsappPrefixChange() {
    this.basicInfoForm.get('whatsappPhoneNumberPrefix')?.valueChanges
      .subscribe((prefix) => {
        setTimeout(() => {
          if (prefix) {
            this.basicInfoForm.get('whatsapp')?.setValidators([
              Validators.required,
              phoneNumberValidator(prefix)
            ]);
          } else {
            // Handle the case where prefix is null or undefined
            // Example: Set a default validator or clear the existing one
            this.basicInfoForm.get('whatsapp')?.setValidators([
              Validators.required
              // You can add a default validator if needed
            ]);
          }
          this.basicInfoForm.get('whatsapp')?.updateValueAndValidity();
        }, 500);
      });
  }

  get phoneNumberControl() {
    return this.basicInfoForm.get('phoneNumber');
  }

  get whatsappControl() {
    return this.basicInfoForm.get('whatsapp');
  }

  get bf() {
    return this.bioForm.controls;
  }

  get sf() {
    return this.skillsForm.controls;
  }

  showMessage(type: string, msg: string): void {
    this.message.create(type, msg, {
      nzDuration: 5000
    });
  }
}
