import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Station, Measurement } from '../../models/models';
import { StationService } from '../../services/api/station.service';
import { AuthenticationService } from '../../services/services';
import { MeasurementService } from '../../services/api/measurement.service';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'Wetr-measurement-form',
  templateUrl: './measurement-form.component.html',
  styles: []
})
export class MeasurementFormComponent implements OnInit {

  measurementForm: FormGroup;
  measurement:Measurement = new Measurement();
  station:Station = new Station();
  stations:Station[] = [];
  errors: { [key: string]: string } = {};

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route:ActivatedRoute,
    private stationService:StationService,
    private auth: AuthenticationService,
    private measurementService:MeasurementService
  ) { }

  ngOnInit() {
    this.station.Id = 1;
    this.stationService.GetAll().subscribe(res => this.stations = res);

    this.measurementForm = this.fb.group({
      station: [this.station, Validators.required],
      date: [this.measurement.DateTime, Validators.required],
      temperature: [this.measurement.Temperature, [
        Validators.required,
        Validators.min(-274)
      ]],
      pressure: [this.measurement.Pressure, [
        Validators.required,
        Validators.min(0)
      ]],
      rainfall: [this.measurement.Rainfall, [
        Validators.required,
        Validators.min(0)
      ]],
      moisture: [this.measurement.Moisture, [
        Validators.required,
        Validators.min(0)
      ]],
      velocity: [this.measurement.Velocity, [
        Validators.required,
        Validators.min(0)
      ]],
      direction: [this.measurement.Direction, [
        Validators.required,
        Validators.min(0),
        Validators.max(360)
      ]]
    });
    this.measurementForm.statusChanges.subscribe(() => this.updateErrorMessages());
  }

  updateErrorMessages() {
    this.errors = {};
    
    for (const message of MeasurementFormErrorMessages) {
      const control = this.measurementForm.get(message.forControl);
      if (control &&
          control.dirty &&
          control.invalid &&
          control.errors[message.forValidator] &&
          !this.errors[message.forControl]) {
        this.errors[message.forControl] = message.text;
      }
    }
  }

  compareStationById(item1: Station, item2: Station) {
    return item1.Id === item2.Id;
  }

  submitForm(){
    this.measurementService.Insert(this.measurement).subscribe(res => this.router.navigateByUrl("/"));
  }

}

export class ErrorMessage {
  constructor(
    public forControl: string,
    public forValidator: string,
    public text: string
  ) { }
}

export const MeasurementFormErrorMessages = [
  new ErrorMessage('station', 'required', 'Required'),
  new ErrorMessage('date', 'required', 'Required'),
  new ErrorMessage('temperature', 'required', 'Required'),
  new ErrorMessage('temperature', 'min', 'Less then -274 is not allowed!'),
  new ErrorMessage('pressure', 'required', 'Required'),
  new ErrorMessage('pressure', 'min', 'Less then zero is not allowed!'),
  new ErrorMessage('rainfall', 'required', 'Required'),
  new ErrorMessage('rainfall', 'min', 'Less then zero is not allowed!'),
  new ErrorMessage('moisture', 'required', 'Required'),
  new ErrorMessage('moisture', 'min', 'Less then zero is not allowed!'),
  new ErrorMessage('velocity', 'required', 'Required'),
  new ErrorMessage('velocity', 'min', 'Less then zero is not allowed!'),
  new ErrorMessage('direction', 'required', 'Required'),
  new ErrorMessage('direction', 'min', 'Less then zero is not allowed!'),
  new ErrorMessage('direction', 'max', 'Greater then 360 is not allowed!')
];