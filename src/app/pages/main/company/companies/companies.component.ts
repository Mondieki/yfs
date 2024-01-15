import { Component, OnInit } from '@angular/core';
import { VERTICALS } from 'src/app/core/consts/_business';
import { CompaniesService } from 'src/app/core/services/companies.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {

  data: any[] = [];
  filteredData: any[] = []; // To store the filtered data
  skeleton = new Array(8).fill({}).map((_, index) => ({}));

  pageSize = 20; // Items per page
  currentPage = 1; // Current page number
  total = 0; // Total number of items

  loading = true;
  vertical: string = '';

  verticals = VERTICALS;

  constructor(private coService: CompaniesService) { }

  ngOnInit(): void {
    this.coService.getAllCompanies()
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

  onVerticalChange(vert: string): void {
    this.vertical = vert;
    this.currentPage = 1; // Reset to first page after changing the focus
    this.filterData();
  }

  private filterData(): void {
    if (this.vertical) {
      this.filteredData = this.data.filter(item => item.vertical === this.vertical);
    } else {
      this.filteredData = this.data; // No filter applied
    }
    this.total = this.filteredData.length; // Update total with filtered data length
  }
}
