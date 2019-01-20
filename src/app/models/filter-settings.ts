import { IntervalType, AccumulationType } from '../enums/enums';
import { Station } from '../models/models';

export class FilterSettings {
  public stations:Station[];
  public interval:IntervalType = IntervalType.Day;
  public accumulation:AccumulationType = AccumulationType.Avg;
  public from:Date = new Date(((new Date()).setDate((new Date()).getDate() - 7)));
  public to:Date = new Date();
}
