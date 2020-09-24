import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassAttendComponent } from './class-attend.component';

describe('ClassAttendComponent', () => {
  let component: ClassAttendComponent;
  let fixture: ComponentFixture<ClassAttendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassAttendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassAttendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
