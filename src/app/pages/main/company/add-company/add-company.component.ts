import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { arrayUnion } from '@angular/fire/firestore';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BUSINESS_STAGES, FUNDING_STAGES, VERTICALS } from 'src/app/core/consts/_business';
import { COUNTRIES } from 'src/app/core/consts/_countries';
import { REVENUES } from 'src/app/core/consts/_revenues';
import { AuthService } from 'src/app/core/services/auth.service';
import { CompaniesService } from 'src/app/core/services/companies.service';
import { UserService } from 'src/app/core/services/user.service';
import { UrlType, urlValidator } from 'src/app/core/validators/url.validator';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss']
})
export class AddCompanyComponent implements OnInit {

  companyForm!: FormGroup;

  biz_stages = BUSINESS_STAGES;
  countries = COUNTRIES;
  funding = FUNDING_STAGES;
  revenues = REVENUES;
  verticals = VERTICALS;

  user!: User;

  constructor(
    private auth: AuthService,
    private coService: CompaniesService,
    private fb: FormBuilder,
    private message: NzMessageService,
    private router: Router,
    private userService: UserService) { }

  ngOnInit(): void {
    this.companyForm = this.fb.group({
      companyDescription: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(300)]],
      companyStage: [null, Validators.required],
      domainUrl: [null, [urlValidator(UrlType.URL)]],
      fundingType: [null, Validators.required],
      headquarters: [null, Validators.required],
      isRegistered: [null, Validators.required],
      name: [null, Validators.required],
      mrr: [null],
      vertical: [null, Validators.required],
    });

    this.auth.getUserAuthObject()
      .then((user: any) => {
        this.user = user;
      })
      .catch(err => {
        console.log(err)
      })
  }

  submitForm(): void {
    if (this.companyForm.valid) {
      var co = {
        ID: this.generateRandomString(20),
        team: [this.user.uid],
        ...this.companyForm.value
      }
      this.coService.createCompany(co)
      .then(() => {
        this.showMessage('success', `Created ${this.companyForm.value.name}.`);
        this.userService.updateUser(this.user.uid, {
          companies: arrayUnion(`${co.ID}`)
        });
        this.router.navigate(['/']);
      })
      .catch(err => {
        this.showMessage('error', `Could not create ${this.companyForm.value.name} at the moment`);
      })
    } else {
      Object.values(this.companyForm.controls).forEach(control => {
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

  generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let result = '';

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }
}
