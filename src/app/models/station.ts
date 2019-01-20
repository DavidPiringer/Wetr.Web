import { StationType } from './station-type';
import { Coordinate } from './coordinate';
import { Community } from './community';
import { User } from './user';

export class Station {
  Id: number = 0;
  Name: string = "";
  StationType: StationType = new StationType();
  Coordinate: Coordinate = new Coordinate();
  Street?: string = "";
  Community: Community = new Community();
  User: User = new User();

  constructor() {}
}
