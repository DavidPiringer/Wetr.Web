import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthenticationGuard } from './guards/guards';
import { AppComponent } from './app.component';
import { MyStationsListComponent } from './components/my-stations-list/my-stations-list.component';
import { StationDetailsComponent } from './components/station-details/station-details.component';
import { StationFormComponent } from './components/station-form/station-form.component';
import { MeasurementFormComponent } from './components/measurement-form/measurement-form.component';


const routes: Routes = [
  {
    path: 'index.html',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'my-stations',
    component: MyStationsListComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'show/station/:id',
    component: StationDetailsComponent
  },
  {
    path: 'edit/station/:id',
    component: StationFormComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'add/station',
    component: StationFormComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'add/measurement',
    component: MeasurementFormComponent,
    canActivate: [AuthenticationGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
