import { Component, OnInit, Input } from '@angular/core';
import { SearchResult } from '../../models/models';

@Component({
  selector: 'a.Wetr-search-item',
  templateUrl: './search-item.component.html',
  styles: []
})
export class SearchItemComponent implements OnInit {

  @Input() suggestion: SearchResult;

  constructor() { }

  ngOnInit() {
  }

  filterTypeToString(): String{
    switch(this.suggestion.FilterType){
      case 0: return "Coordinate";
      case 1: return "Community";
      case 2: return "District";
      case 3: return "Province";
      case 4: return "Station";
    }
  }
}
