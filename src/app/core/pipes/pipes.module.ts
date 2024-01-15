import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyStagePipe } from './company-stage.pipe';
import { CountryFlagPipe } from './country-flag.pipe';
import { RolePipe } from './role.pipe';
import { TimeAgoPipe } from './time-ago.pipe';
import { TruncateTextPipe } from './truncate-text.pipe';
import { UppercaseIfShortPipe } from './uppercase-if-short.pipe';
import { ValidURLPipe } from './valid-url.pipe';


@NgModule({
  declarations: [
    CompanyStagePipe,
    CountryFlagPipe,
    RolePipe,
    TimeAgoPipe,
    TruncateTextPipe,
    UppercaseIfShortPipe,
    ValidURLPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CompanyStagePipe,
    CountryFlagPipe,
    RolePipe,
    TimeAgoPipe,
    TruncateTextPipe,
    UppercaseIfShortPipe,
    ValidURLPipe,
  ]
})
export class PipesModule { }
