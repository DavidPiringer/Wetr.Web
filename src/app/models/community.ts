import { District } from './district';
export class Community {
  Id: number = 1;
  District: District = new District();
  Name?: string = "";
  Zip: number = 0;

  constructor() { }
}
