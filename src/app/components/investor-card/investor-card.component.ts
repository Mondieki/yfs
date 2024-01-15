import { Component, Input } from '@angular/core';

@Component({
  selector: 'investor-card',
  templateUrl: './investor-card.component.html',
  styleUrls: ['./investor-card.component.scss']
})
export class InvestorCardComponent {
  @Input() investor: any;
}
