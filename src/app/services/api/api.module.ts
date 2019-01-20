/* tslint:disable */
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { MeasurementService } from './measurement.service';
import { StationService } from './station.service';
import { UserService } from './user.service';
import { SearchService } from './search.service';
import { ApiConfiguration } from './api-configuration';

/**
 * Provider for all Api services, plus ApiConfiguration
 */
@NgModule({
  imports: [
    HttpClientModule
  ],
  exports: [
    HttpClientModule
  ],
  declarations: [],
  providers: [
    ApiConfiguration,
    MeasurementService,
    StationService,
    UserService,
    SearchService
  ],
})
export class ApiModule { }
