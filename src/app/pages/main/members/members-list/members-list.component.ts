import { Component, OnInit } from '@angular/core';
import { ROLES } from 'src/app/core/consts/_roles';
import { MembersService } from 'src/app/core/services/members.service';

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.scss']
})
export class MembersListComponent implements OnInit {
  data: any[] = [];
  filteredData: any[] = []; // To store the filtered data
  skeleton = new Array(8).fill({}).map((_, index) => ({}));

  pageSize = 20; // Items per page
  currentPage = 1; // Current page number
  total = 0; // Total number of items

  loading = true;

  selectedRole: string = '';

  roles = ROLES;

  constructor(private membersService: MembersService) { }

  ngOnInit(): void {

    this.membersService.getAllMembers()
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

  onRoleChange(role: string): void {
    this.selectedRole = role;
    this.currentPage = 1; // Reset to first page after changing the focus
    this.filterData();
  }

  private filterData(): void {
    if (this.selectedRole) {
      this.filteredData = this.data.filter(item => item.role === this.selectedRole);
    } else {
      this.filteredData = this.data; // No filter applied
    }
    this.total = this.filteredData.length; // Update total with filtered data length
  }
}
