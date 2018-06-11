import { Injectable } from "@angular/core";
import { SearchModule } from "../search.module";
import { BehaviorSubject, Subject } from "rxjs";
import { finalize } from 'rxjs/operators';
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable()
export class SearchService {

  constructor(private http: HttpClient) { }

  private resultsSource$ = new BehaviorSubject([]);
  private nextPageToken = null;

  results$ = this.resultsSource$.asObservable();
  loading$ = new Subject<boolean>();

  search(query: string) {
    this.loading$.next(true);
    this.http.get(`/api/videos?q=${query}`)
      .pipe(finalize(() => this.loading$.next(false)))
      .subscribe((response: any) => {
        this.nextPageToken = response.nextPageToken;
        this.resultsSource$.next(response.items);
      });
  }

  loadMore() {
    this.loading$.next(true);
    this.http.get(`/api/videos?nextPageToken=${this.nextPageToken}`)
      .pipe(finalize(() => this.loading$.next(false)))
      .subscribe((response: any) => {
        this.nextPageToken = response.nextPageToken;
        this.resultsSource$.next([
          ...this.resultsSource$.getValue(),
          ...response.items
        ]);
      })
  }

}