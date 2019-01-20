import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { AppComponent } from './app.component';
import { AuthenticationGuard } from './guards/guards';
import { AuthenticationService, DashboardService } from './services/services';
import { DashboardItemComponent } from './components/dashboard-item/dashboard-item.component'
import { ChartsModule } from 'ng2-charts';
import { SuiModule, SuiDropdownModule } from 'ng2-semantic-ui';

import { ApiModule } from './services/api/api.module';

import { MenuComponent } from './components/menu/menu.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SearchComponent } from './components/search/search.component';
import { SearchItemComponent } from './components/search-item/search-item.component';
import { ChartComponent } from './components/chart/chart.component';
import { MyStationsListComponent } from './components/my-stations-list/my-stations-list.component';
import { MyStationsListItemComponent } from './components/my-stations-list-item/my-stations-list-item.component';
import { StationDetailsComponent } from './components/station-details/station-details.component';
import { StationFormComponent } from './components/station-form/station-form.component';
import { MeasurementFormComponent } from './components/measurement-form/measurement-form.component';
import { DashboardItemSettingsComponent } from './components/dashboard-item-settings/dashboard-item-settings.component';
import { MeasurementTableComponent } from './components/measurement-table/measurement-table.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    DashboardItemComponent,
    SearchComponent,
    SearchItemComponent,
    ChartComponent,
    MenuComponent,
    MyStationsListComponent,
    MyStationsListItemComponent,
    StationDetailsComponent,
    StationFormComponent,
    MeasurementFormComponent,
    DashboardItemSettingsComponent,
    MeasurementTableComponent
  ],
  imports: [
    SuiModule,
    SuiDropdownModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule
  ],
  providers: [
    ApiModule,
    AuthenticationGuard,
    AuthenticationService,
    DashboardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
