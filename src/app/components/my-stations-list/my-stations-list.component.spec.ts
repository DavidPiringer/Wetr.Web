import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyStationsListComponent } from './my-stations-list.component';

describe('MyStationsListComponent', () => {
  let component: MyStationsListComponent;
  let fixture: ComponentFixture<MyStationsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyStationsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyStationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
