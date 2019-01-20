import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from '../../services/api/search.service';
import { DashboardItem, FilterSettings, SearchResult, FilterType, Station } from '../../models/models';
import { DashboardService } from '../../services/services';
import { AuthenticationService } from '../../services/services';

@Component({
  selector: 'Wetr-menu',
  templateUrl: './menu.component.html',
  styles: []
})
export class MenuComponent implements OnInit {

  constructor(
    private search:SearchService, 
    private dashboard:DashboardService, 
    private auth:AuthenticationService, 
    private router: Router
  ) { }

  ngOnInit() {
  }

  optionsSearch = (query:string) => {
    return this.search.BySearchValue(query).toPromise();
  };

  searchResultSelected(e:SearchResult){
    this.search.BySearchResults([e]).subscribe(
      res => this.addItem(e,res)
    );
  }

  private addItem(e:SearchResult, stations:Station[]){
    var item = new DashboardItem();
    var filter = new FilterSettings();
    filter.stations = stations;
    item.filter = filter;
    item.name = e.Text;
    this.dashboard.saveItem(item);
  }

  filterTypeToString(ft:FilterType):string{
    switch(ft){
      case 0: return "Coordinate";
      case 1: return "Community";
      case 2: return "District";
      case 3: return "Province";
      case 4: return "Station";
    }
  }

  logout(){
    this.auth.logout();
    this.router.navigateByUrl("/");
  }
}
