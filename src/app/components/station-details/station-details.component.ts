import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Station } from '../../models/models';
import { StationService } from '../../services/api/station.service';
import { AuthenticationService } from '../../services/services';
import { MeasurementService } from '../../services/api/measurement.service';

@Component({
  selector: 'Wetr-station-details',
  templateUrl: './station-details.component.html',
  styles: []
})
export class StationDetailsComponent implements OnInit {

  station:Station;

  constructor(
    private router: Router,
    private route:ActivatedRoute,
    private stationService:StationService,
    private auth: AuthenticationService,
    private measurementService:MeasurementService
  ) { }

  ngOnInit() {
    this.route.params
    .subscribe(params => this.stationService.GetById(params['id'])
    .subscribe(res => this.station = res));
  }

  editStation(){
    if(this.auth.getCurrentUser() == this.station.User.Username)
      this.router.navigateByUrl(`/edit/station/${this.station.Id}`);
  }
}
