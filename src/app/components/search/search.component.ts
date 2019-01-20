import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { switchMap, distinctUntilChanged, debounceTime, tap, filter, catchError } from 'rxjs/operators';
import { SearchResult, Station, DashboardItem, FilterSettings } from '../../models/models';
import { SearchService } from '../../services/api/search.service';
import { DashboardService } from '../../services/dashboard.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'Wetr-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {

  isLoading = false;
  searchText: String = "";
  suggestions: SearchResult[] = [];
  keyup = new EventEmitter<string>();

  @Output() onAddItem: EventEmitter<DashboardItem> = new EventEmitter();

  constructor(private search:SearchService, private dashboard:DashboardService) { }

  ngOnInit() {
  this.keyup.pipe(
    debounceTime(200), 
    distinctUntilChanged(), 
    tap(() => this.isLoading = true), 
    filter(r => {
      if(r == undefined || r == null || r == '' || r.length == 0){
        this.suggestions = [];
        return false;
      }
      return true;
    }),
    switchMap((searchTerm) => this.search.BySearchValue(searchTerm)),
    catchError(err => of([])),
    tap(() => this.isLoading = false)
  )
  .subscribe(
    res => this.suggestions = res,
    err => this.suggestions = []
  );
  }

  searchResultSelected(e:SearchResult){
    this.suggestions = [];
    this.search.BySearchResults([e]).subscribe(
      res => this.addItem(e,res)
    );
  }

  private addItem(e:SearchResult, stations:Station[]){
    this.searchText="";
    var item = new DashboardItem();
    var filter = new FilterSettings();
    filter.stations = stations;
    item.filter = filter;
    item.name = e.Text;
    this.dashboard.saveItem(item);
    this.onAddItem.emit(item);
  }
}
