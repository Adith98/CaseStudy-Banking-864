import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckstatusComponent } from './checkstatus.component';

describe('CheckstatusComponent', () => {
  let component: CheckstatusComponent;
  let fixture: ComponentFixture<CheckstatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckstatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
