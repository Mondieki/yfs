import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PagesRoutingModule } from './pages-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { DirectivesModule } from 'src/app/core/directives/directives.module';
import { PipesModule } from 'src/app/core/pipes/pipes.module';

import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

import { AddCompanyComponent } from './company/add-company/add-company.component';
import { CompaniesComponent } from './company/companies/companies.component';
import { CompanyProfileComponent } from './company/company-profile/company-profile.component';
import { CreatePostComponent } from './posts/create-post/create-post.component';
import { InvestorProfileComponent } from './investors/investor-profile/investor-profile.component';
import { InvestorsListComponent } from './investors/investors-list/investors-list.component';
import { MainComponent } from './main.component';
import { MemberComponent } from './members/member/member.component';
import { MembersListComponent } from './members/members-list/members-list.component';
import { PostComponent } from './posts/post/post.component';
import { PostsListComponent } from './posts/posts-list/posts-list.component';
import { UpdateProfileComponent } from './profile/update-profile/update-profile.component';


@NgModule({
  declarations: [
    AddCompanyComponent,
    CompaniesComponent,
    CompanyProfileComponent,
    CreatePostComponent,
    InvestorProfileComponent,
    InvestorsListComponent,
    MainComponent,
    MemberComponent,
    MembersListComponent,
    PostComponent,
    PostsListComponent,
    UpdateProfileComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    PagesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    DirectivesModule,
    PipesModule,
    NzAvatarModule,
    NzBadgeModule,
    NzBreadCrumbModule,
    NzButtonModule,
    NzCardModule,
    NzCommentModule,
    NzDividerModule,
    NzFormModule,
    NzIconModule,
    NzInputModule,
    NzLayoutModule,
    NzListModule,
    NzMenuModule,
    NzPageHeaderModule,
    NzPaginationModule,
    NzRadioModule,
    NzSelectModule,
    NzSkeletonModule,
    NzSpinModule,
    NzStepsModule,
    NzTagModule,
    NzTypographyModule
  ]
})
export class PagesModule { }
