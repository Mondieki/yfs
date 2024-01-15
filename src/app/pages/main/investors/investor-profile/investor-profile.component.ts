import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InvestorService } from 'src/app/core/services/investors.service';

@Component({
  selector: 'app-investor-profile',
  templateUrl: './investor-profile.component.html',
  styleUrls: ['./investor-profile.component.scss']
})
export class InvestorProfileComponent implements OnInit {

  investor: any;

  constructor(
    private actvRoute: ActivatedRoute,
    private investorService: InvestorService) { }

  ngOnInit() {
    this.actvRoute.params.subscribe((prms) => {
      this.investorService.getInvestorDetails(prms['id'])
        .then((resp) => { this.investor = resp })
        .catch(err => { console.log(err) })
    })
  }
}
