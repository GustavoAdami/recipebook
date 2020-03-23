import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GNETComponent } from './gnet.component';

describe('GNETComponent', () => {
  let component: GNETComponent;
  let fixture: ComponentFixture<GNETComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GNETComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GNETComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
