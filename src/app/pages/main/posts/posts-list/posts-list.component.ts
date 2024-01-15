import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/core/services/posts.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {
  data: any[] = [];
  skeleton = new Array(8).fill({}).map((_, index) => ({}));

  pageSize = 20; // Items per page
  currentPage = 1; // Current page number
  total = 0; // Total number of items

  loading = true;

  constructor(private postServices: PostsService) { }

  ngOnInit(): void {
    this.postServices.getAllPosts()
      .then((resp: any) => {
        this.loading = false;
        this.data = resp;
        this.total = this.data.length;
      })
      .catch((err) => console.log(err));
  }

  get paginatedItems() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.data.slice(startIndex, startIndex + this.pageSize);
  }

  onPageChange(event: number): void {
    this.currentPage = event;
  }

  onPageSizeChange(newPageSize: number): void {
    this.pageSize = newPageSize;
    this.currentPage = 1; // Reset to first page after changing the page size
  }

  getColorForCategory(category: TagCategory): string {
    const categoryColorMap: Record<TagCategory, string> = {
      "Post Types": "magenta",
      "Topic Areas": "red",
      "Specific Challenges": "volcano",
      "Industry-Specific": "orange",
      "Development Phases": "gold",
      "Networking & Community": "green",
      "Tools & Resources": "cyan",
      "Current Events": "blue",
      "Personal Experiences": "geekblue",
      "Miscellaneous": "purple"
    };
    return categoryColorMap[category] || 'pink'; // Replace 'defaultColor' with your default color
  }
}

type TagCategory =
  | "Post Types"
  | "Topic Areas"
  | "Specific Challenges"
  | "Industry-Specific"
  | "Development Phases"
  | "Networking & Community"
  | "Tools & Resources"
  | "Current Events"
  | "Personal Experiences"
  | "Miscellaneous";