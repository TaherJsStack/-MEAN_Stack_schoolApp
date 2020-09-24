import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllLinesComponent } from './all-lines.component';

describe('AllLinesComponent', () => {
  let component: AllLinesComponent;
  let fixture: ComponentFixture<AllLinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllLinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllLinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
