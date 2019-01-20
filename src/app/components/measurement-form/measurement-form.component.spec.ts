import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasurementFormComponent } from './measurement-form.component';

describe('MeasurementFormComponent', () => {
  let component: MeasurementFormComponent;
  let fixture: ComponentFixture<MeasurementFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeasurementFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasurementFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
