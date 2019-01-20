export class Measurement {
  Id: number = 1;
  StationId: number = 1;
  DateTime: Date = new Date();
  Temperature: number = 0;
  Pressure: number = 0;
  Rainfall: number = 0;
  Moisture: number = 0;
  Velocity: number = 0;
  Direction: number = 0;

  constructor() { }

}
