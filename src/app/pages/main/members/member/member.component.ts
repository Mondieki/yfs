import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MembersService } from 'src/app/core/services/members.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent {
  
  user: any;

  constructor(
    private actvRoute: ActivatedRoute,
    private memberService: MembersService) { }

  ngOnInit() {
    this.actvRoute.params.subscribe((prms) => {
      this.memberService.getMemberDetails(prms['id'])
        .then((resp) => { this.user = resp })
        .catch(err => { console.log(err) })
    })
  }
}
