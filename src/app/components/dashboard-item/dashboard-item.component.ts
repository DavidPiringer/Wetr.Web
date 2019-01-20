import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Measurement } from '../../models/models';
import { IntervalType, AccumulationType } from '../../enums/enums';
import { DashboardItem } from '../../models/models';
import { MeasurementService } from '../../services/api/measurement.service';
import { DashboardService } from '../../services/services';

@Component({
  selector: 'Wetr-dashboard-item',
  templateUrl: './dashboard-item.component.html',
  styles: []
})
export class DashboardItemComponent implements OnInit {
  private activeMenu:DashboardMenuType = DashboardMenuType.Chart;
  private now: Date = new Date();
  private intervalOptions:IntervalType[] = [];
  private accumulationOptions:AccumulationType[] = [];
  
  @Input() item:DashboardItem;
  measurements: Measurement[] = [];

  @Output() onDelete: EventEmitter<DashboardItem> = new EventEmitter();

  constructor(private measurementService:MeasurementService, private dashboard:DashboardService) { }

  ngOnInit() {
    this.intervalOptions.push(IntervalType.Day, IntervalType.Week, IntervalType.Month, IntervalType.Year);
    this.accumulationOptions.push(AccumulationType.Avg, AccumulationType.Min, AccumulationType.Max);
    this.refreshData();
  }

  refreshData(){
    this.dashboard.updateItem(this.item);
    if(this.item.accumulationActive)
      this.measurementService.ByFilter(this.item.filter).subscribe(
        res => this.measurements = res,
        err => this.measurements = []
      );
    else
      this.measurementService.ByStations(this.item.filter.stations, this.item.filter.from, this.item.filter.to).subscribe(
        res => this.measurements = res,
        err => this.measurements = []
      );
  }

  changeMenu(option:DashboardMenuType){
    this.activeMenu = option;
  }

  remove(){
    this.dashboard.removeItem(this.item);
    this.onDelete.emit(this.item);
  }
}

export enum DashboardMenuType{
  Chart,
  Table,
  Settings
}