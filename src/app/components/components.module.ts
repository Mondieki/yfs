import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzTagModule } from 'ng-zorro-antd/tag';

import { PipesModule } from '../core/pipes/pipes.module';

import { CompanyCardComponent } from './company-card/company-card.component';
import { InvestorCardComponent } from './investor-card/investor-card.component';
import { UserCardComponent } from './user-card/user-card.component';



@NgModule({
  declarations: [
    CompanyCardComponent,
    InvestorCardComponent,
    UserCardComponent,
  ],
  imports: [
    CommonModule,
    
    NzCardModule,
    NzIconModule,
    NzListModule,
    NzTagModule,
    
    RouterModule,
    PipesModule
  ],
  exports: [
    CompanyCardComponent,
    InvestorCardComponent,
    UserCardComponent,
  ]
})
export class ComponentsModule { }
