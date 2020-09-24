import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendesComponent } from './attendes.component';

describe('AttendesComponent', () => {
  let component: AttendesComponent;
  let fixture: ComponentFixture<AttendesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
