import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Station, StationType, Community } from '../../models/models';
import { StationService } from '../../services/api/station.service';
import { AuthenticationService } from '../../services/services';

@Component({
  selector: 'Wetr-station-form',
  templateUrl: './station-form.component.html',
  styles: []
})
export class StationFormComponent implements OnInit {

  station:Station = new Station();
  stationTypes:StationType[] = [];
  communities:Community[] = [];
  isUpdating:boolean = false;

  constructor(
    private router: Router,
    private route:ActivatedRoute,
    private stationService:StationService,
    private auth: AuthenticationService
  ) { }

  ngOnInit() {
    this.stationService.GetAllStationTypes()
    .subscribe(res => this.stationTypes = res);

    this.stationService.GetAllCommunities()
    .subscribe(res => this.communities = res.sort((a,b) => a.Zip-b.Zip));

    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isUpdating = true;
      this.stationService.GetById(id).subscribe(res => {
        if(this.auth.getCurrentUser() == res.User.Username)
          this.station = res;
        else
          this.router.navigateByUrl('/');
      });
    }
    
  }

  compareStationTypeById(item1: StationType, item2: StationType) {
    return item1.Id === item2.Id;
  }

  compareCommunityById(item1: Community, item2: Community) {
    return item1.Id === item2.Id;
  }

  submitForm(){
    if(this.isUpdating){
      if(this.auth.getCurrentUser() == this.station.User.Username)
      this.stationService.UpdateStation(this.station)
      .subscribe(res => this.router.navigateByUrl(`/show/station/${this.station.Id}`));
    }
    else {
      this.stationService.InsertStation(this.station)
      .subscribe(res => this.router.navigateByUrl(`/my-stations`));
    }
  }

}
