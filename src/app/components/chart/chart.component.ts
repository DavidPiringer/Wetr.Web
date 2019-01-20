import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { Measurement } from '../../models/models';
import { TemperatureConversion } from '../../enums/enums';

@Component({
  selector: 'Wetr-chart',
  templateUrl: './chart.component.html',
  styles: []
})

export class ChartComponent implements OnInit {
  
  @Input() temperatureConversion:TemperatureConversion;
  @Input() set measurements(value: Measurement[]) {
    this._measurements = value;
    this.mapMeasurementsToLineChart();
  }
  get measurements():Measurement[] {
    return this._measurements;
  }
  _measurements: Measurement[] = [];
  activeMenu:ChartMenuType = ChartMenuType.Temperature;
  // lineChart
  public lineChartData:Array<any> = [{data: [], label: ''}];
  public lineChartLabels:Array<any> = [];
  public lineChartOptions:any = {
    responsive: true,
    animation: {
      duration: 0
    }
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend:boolean = false;
  public lineChartType:string = 'line';

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
  
  public chartHovered(e:any):void {
    console.log(e);
  }

  constructor() { }

  ngOnInit() {
    this.mapMeasurementsToLineChart();
  }

  changeMenu(option:ChartMenuType){
    this.activeMenu = option;
    this.mapMeasurementsToLineChart();
  }

  mapMeasurementsToLineChart(){
    this.lineChartData[0].data = [];
    this.lineChartData[0].label = this.activeMenu;
    this.lineChartLabels = [];
    this.measurements.forEach(v => {
      this.lineChartData[0].data.push(this.getMeasurementValueFromOption(this.activeMenu, v));
      this.lineChartLabels.push(new Date(v.DateTime).toLocaleString());
    });
  }

  getMeasurementValueFromOption(option:ChartMenuType, measurement:Measurement): number{
    switch(option){
      case ChartMenuType.Temperature: return this.applyConversion(measurement.Temperature);
      case ChartMenuType.Pressure: return measurement.Pressure;
      case ChartMenuType.Rainfall: return measurement.Rainfall;
      case ChartMenuType.Moisture: return measurement.Moisture;
      case ChartMenuType.Velocity: return measurement.Velocity;
      case ChartMenuType.Direction: return measurement.Direction;
    }
  }

  applyConversion(num:number):number{
    switch(this.temperatureConversion){
      case TemperatureConversion.Celsius: return num;
      case TemperatureConversion.Fahrenheit: return num * 9/5 + 32;
      case TemperatureConversion.Kelvin: return num + 273.15;
      case TemperatureConversion.Rankine: return (num + 273.15) * ​9/5;
      case TemperatureConversion.Delisle: return (100 - num) * ​3/2;
      case TemperatureConversion.Newton: return num * 33/100;
      case TemperatureConversion.Reaumur: return num * 4/5;
      case TemperatureConversion.Romer: return num * 21/40 + 7.5;
    }
  }
}

export enum ChartMenuType {
  Temperature,
  Pressure,
  Rainfall,
  Moisture,
  Velocity,
  Direction
}
