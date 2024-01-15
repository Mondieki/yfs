import { Component, Input } from '@angular/core';

@Component({
  selector: 'company-card',
  templateUrl: './company-card.component.html',
  styleUrls: ['./company-card.component.scss']
})
export class CompanyCardComponent {
  @Input() company: any;
}
