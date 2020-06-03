import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaumComponent } from './raum.component';

describe('RaumComponent', () => {
  let component: RaumComponent;
  let fixture: ComponentFixture<RaumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
