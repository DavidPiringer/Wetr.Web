import { Component, OnInit } from '@angular/core';
import { StationService } from '../../services/api/station.service';
import { AuthenticationService } from '../../services/services';
import { Station } from '../../models/models';

@Component({
  selector: 'Wetr-my-stations-list',
  templateUrl: './my-stations-list.component.html',
  styles: []
})
export class MyStationsListComponent implements OnInit {

  stations:Station[] = [];

  constructor(
    private stationService:StationService,
    private auth: AuthenticationService
  ) { }

  ngOnInit() {
    this.stationService.GetByUserName(this.auth.getCurrentUser()).subscribe(res => this.stations = res);
  }

  onItemDelete(event:Station){
    var idx = this.stations.findIndex(s => s.Id == event.Id);
    if(idx) this.stations.splice(idx, 1);
  }
}
