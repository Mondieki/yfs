import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main.component';
import { AddCompanyComponent } from './company/add-company/add-company.component';
import { CreatePostComponent } from './posts/create-post/create-post.component';
import { CompaniesComponent } from './company/companies/companies.component';
import { CompanyProfileComponent } from './company/company-profile/company-profile.component';
import { InvestorProfileComponent } from './investors/investor-profile/investor-profile.component';
import { InvestorsListComponent } from './investors/investors-list/investors-list.component';
import { MemberComponent } from './members/member/member.component';
import { MembersListComponent } from './members/members-list/members-list.component';
import { PostsListComponent } from './posts/posts-list/posts-list.component';
import { PostComponent } from './posts/post/post.component';
import { UpdateProfileComponent } from './profile/update-profile/update-profile.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: '/companies',
        pathMatch: 'full'
      },
      {
        path: 'add-company',
        component: AddCompanyComponent
      },
      {
        path: 'create-post',
        component: CreatePostComponent
      },
      {
        path: 'companies',
        component: CompaniesComponent
      },
      {
        path: 'company/:id',
        component: CompanyProfileComponent
      },
      {
        path: 'investor/:id',
        component: InvestorProfileComponent
      },
      {
        path: 'investors',
        component: InvestorsListComponent
      },
      {
        path: 'member/:id',
        component: MemberComponent
      },
      {
        path: 'members',
        component: MembersListComponent
      },
      {
        path: 'post/:id',
        component: PostComponent
      },
      {
        path: 'posts',
        component: PostsListComponent
      },
      {
        path: 'update-profile',
        component: UpdateProfileComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
