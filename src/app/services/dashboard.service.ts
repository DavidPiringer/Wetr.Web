import { Injectable, EventEmitter } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { DashboardItem } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  readonly lsKey = "dashboardItems";

  constructor() { }

  public getItems():DashboardItem[] {
    var arr = JSON.parse(localStorage.getItem(this.lsKey)) || new Array<DashboardItem>();
    arr.forEach(element => {
      element.filter.to = new Date(element.filter.to);
      element.filter.from = new Date(element.filter.from);
    });
    return arr;
  } 

  public saveItem(item:DashboardItem){
    var arr = this.getItems();
    arr.push(item);
    this.saveItemArray(arr);
  }

  public removeItem(item:DashboardItem){
    var arr = this.getItems();
    var idx = arr.findIndex(i => i.id == item.id);
    if(idx > -1) {
      arr.splice(idx, 1);
      this.saveItemArray(arr);
    }
  }

  public updateItem(item:DashboardItem){
    var arr = this.getItems();
    var idx = arr.findIndex(i => i.id == item.id);
    if(idx > -1) {
      arr[idx] = item;
      this.saveItemArray(arr);
    }
  }

  private saveItemArray(arr:DashboardItem[]){
    localStorage.setItem(this.lsKey, JSON.stringify(arr));
  }
}
