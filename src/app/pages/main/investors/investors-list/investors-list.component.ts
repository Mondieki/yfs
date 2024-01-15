import { Component, OnInit } from '@angular/core';
import { FUND_FOCUS } from 'src/app/core/consts/_fund-focus';
import { InvestorService } from 'src/app/core/services/investors.service';

@Component({
  selector: 'app-investors-list',
  templateUrl: './investors-list.component.html',
  styleUrls: ['./investors-list.component.scss']
})
export class InvestorsListComponent implements OnInit {

  data: any[] = []; // Assuming each item has a 'fund_focus' property as an array
  filteredData: any[] = [];
  skeleton = new Array(8).fill({}).map((_, index) => ({}));

  pageSize = 20; // Items per page
  currentPage = 1; // Current page number
  total = 0; // Total number of items

  loading = true;
  selectedFocus: string = ''; // Property to hold the selected focus

  fund_focus = FUND_FOCUS;

  constructor(private investorService: InvestorService) { }

  ngOnInit(): void {
    this.investorService.getAllInvestors()
      .then((resp: any) => {
        this.loading = false;
        this.data = resp;
        this.filteredData = resp; // Initialize filteredData with all data
        this.total = this.data.length;
      })
      .catch((err) => console.log(err));
  }

  get paginatedItems() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredData.slice(startIndex, startIndex + this.pageSize);
  }

  onPageChange(event: number): void {
    this.currentPage = event;
  }

  onPageSizeChange(newPageSize: number): void {
    this.pageSize = newPageSize;
    this.currentPage = 1; // Reset to first page after changing the page size
  }

  onFundFocusChange(newFocus: string): void {
    this.selectedFocus = newFocus;
    this.currentPage = 1; // Reset to first page after changing the focus
    this.filterData();
  }

  private filterData(): void {
    if (this.selectedFocus) {
      this.filteredData = this.data.filter(item =>
        item.fund_focus && item.fund_focus.includes(this.selectedFocus)
      );
    } else {
      this.filteredData = this.data; // No filter applied
    }
    this.total = this.filteredData.length; // Update total with filtered data length
  }

}
