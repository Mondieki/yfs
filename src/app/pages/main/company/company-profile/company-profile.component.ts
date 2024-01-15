import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, catchError, combineLatest, map, of } from 'rxjs';
import { CompaniesService } from 'src/app/core/services/companies.service';
import { MembersService } from 'src/app/core/services/members.service';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss']
})
export class CompanyProfileComponent implements OnInit {
  
  co: any;

  loading = true;

  memberNames$!: Observable<string[]>;
  
  constructor(
    private actvRoute: ActivatedRoute,
    private coService: CompaniesService,
    private memberService: MembersService) {
    }

  ngOnInit() {
    this.actvRoute.params.subscribe((prms) => {
      this.coService.getCompanyDetails(prms['id'])
        .then((resp) => {
          this.loading = false;
          this.co = resp;
          this.loadMemberNames();
        })
        .catch(err => { console.log(err) })
    })
  }

  loadMemberNames(): void {
    if (this.co.team && this.co.team.length > 0) {
      const memberDetailsObservables = this.co.team.map((id: string) => 
        this.memberService.getMemberDetails$(id).pipe(
          map((member: any) => member?.name || 'Unknown'), // Ensure this maps to a string
          catchError(() => of('Error')) // Handle errors
        )
      );

      // Explicitly type the combined observable
      this.memberNames$ = combineLatest(memberDetailsObservables) as Observable<string[]>;
    } else {
      // Handle case where team is empty or not defined
      this.memberNames$ = of([]);
    }
  }
}
