import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendInfoComponent } from './attend-info.component';

describe('AttendInfoComponent', () => {
  let component: AttendInfoComponent;
  let fixture: ComponentFixture<AttendInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
