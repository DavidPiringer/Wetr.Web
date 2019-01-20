import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Station } from '../../models/models';
import { StationService } from '../../services/api/station.service';

@Component({
  selector: 'Wetr-my-stations-list-item',
  templateUrl: './my-stations-list-item.component.html',
  styles: []
})
export class MyStationsListItemComponent implements OnInit {

  @Input() station: Station;
  @Output() onDelete: EventEmitter<Station> = new EventEmitter();

  isDeleting:boolean;

  constructor(private router: Router, private stationService:StationService) { }

  ngOnInit() {
  }

  showDetails(){
    this.router.navigateByUrl(`/show/station/${this.station.Id}`);
  }

  startDelete(){
    this.isDeleting = true;
  }

  cancelDelete(){
    this.isDeleting = false;
  }

  deleteItem(){
    this.cancelDelete();
    this.onDelete.emit(this.station);
    this.stationService.DeleteStation(this.station).subscribe();
  }

  editStation(){
      this.router.navigateByUrl(`/edit/station/${this.station.Id}`);
  }
}
