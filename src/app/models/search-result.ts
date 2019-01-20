/* tslint:disable */
import { FilterType } from './filter-type';
export interface SearchResult {
  Id: number;
  FilterType: FilterType;
  Text?: string;
  Count: number;
  Value?: any;
}
