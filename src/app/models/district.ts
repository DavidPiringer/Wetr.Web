import { Province } from './province';
export class District {
  Id: number = 1;
  Name?: string = "";
  Province: Province = new Province();

  constructor() { }
}
