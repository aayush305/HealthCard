import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProfileLabComponent } from './view-profile-lab.component';

describe('ViewProfileLabComponent', () => {
  let component: ViewProfileLabComponent;
  let fixture: ComponentFixture<ViewProfileLabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewProfileLabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProfileLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
