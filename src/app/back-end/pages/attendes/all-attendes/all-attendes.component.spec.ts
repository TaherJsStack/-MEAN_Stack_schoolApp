import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAttendesComponent } from './all-attendes.component';

describe('AllAttendesComponent', () => {
  let component: AllAttendesComponent;
  let fixture: ComponentFixture<AllAttendesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllAttendesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllAttendesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
