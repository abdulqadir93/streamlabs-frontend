import { Component, OnInit } from "@angular/core";
import { SearchService } from "./services/search.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  videos$ = this.service.results$;
  loading$ = this.service.loading$;

  constructor(private service: SearchService) { }

  ngOnInit() {
    this.search('');
  }

  search(query: string) {
    this.service.search(query);
  }

  loadMore() {
    this.service.loadMore();
  }

}