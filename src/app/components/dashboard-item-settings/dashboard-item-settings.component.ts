import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { DashboardService } from '../../services/services';
import { DashboardItem } from '../../models/models';


@Component({
  selector: 'Wetr-dashboard-item-settings',
  templateUrl: './dashboard-item-settings.component.html',
  styles: []
})
export class DashboardItemSettingsComponent implements OnInit, OnDestroy {

  @Input() item:DashboardItem;
  
  constructor(private dashboard:DashboardService) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.onChange();
  }

  onChange(){
    this.dashboard.updateItem(this.item);
  }

}
