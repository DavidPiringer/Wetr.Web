import { FilterSettings } from './models';
import { TemperatureConversion } from '../enums/enums';

export class DashboardItem {
  public readonly id:string = Math.random().toString(36).substr(2, 9);
  public name:string;
  public filter:FilterSettings;
  public temperatureConversion:TemperatureConversion = TemperatureConversion.Celsius;
  public accumulationActive:boolean = false;
}
