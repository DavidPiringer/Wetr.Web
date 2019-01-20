import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyStationsListItemComponent } from './my-stations-list-item.component';

describe('MyStationsListItemComponent', () => {
  let component: MyStationsListItemComponent;
  let fixture: ComponentFixture<MyStationsListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyStationsListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyStationsListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
