import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BussAttendComponent } from './buss-attend.component';

describe('BussAttendComponent', () => {
  let component: BussAttendComponent;
  let fixture: ComponentFixture<BussAttendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BussAttendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BussAttendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
