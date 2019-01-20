import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardItemSettingsComponent } from './dashboard-item-settings.component';

describe('DashboardItemSettingsComponent', () => {
  let component: DashboardItemSettingsComponent;
  let fixture: ComponentFixture<DashboardItemSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardItemSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardItemSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
