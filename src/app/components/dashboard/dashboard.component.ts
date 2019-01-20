import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchService } from '../../services/api/search.service';
import { DashboardItem } from '../../models/models';
import { DashboardService } from '../../services/services';

@Component({
  selector: 'Wetr-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})

export class DashboardComponent implements OnInit {

  items:DashboardItem[] = [];

  constructor(private dashboard:DashboardService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.items = this.dashboard.getItems();
  }

  onItemDelete(item:DashboardItem){
    this.items = this.dashboard.getItems();
  }

  onItemAdd(item:DashboardItem){
    this.items.push(item);
  }
}
