import { Component, OnInit, Input } from '@angular/core';
import { Measurement } from '../../models/models';
import { TemperatureConversion } from '../../enums/enums';

@Component({
  selector: 'Wetr-measurement-table',
  templateUrl: './measurement-table.component.html',
  styles: []
})
export class MeasurementTableComponent implements OnInit {

  @Input() temperatureConversion:TemperatureConversion;
  @Input() set measurements(value: Measurement[]) {
    this._measurements = value;
    this.mapMeasurements();
  }
  get measurements():Measurement[] {
    return this._measurements;
  }
  _measurements: Measurement[] = [];
  
  constructor() { }

  ngOnInit() {
  }

  mapMeasurements(){
    for(var i = 0; i < this._measurements.length; ++i){
      this._measurements[i].Temperature = this.applyConversion(this._measurements[i].Temperature);
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
