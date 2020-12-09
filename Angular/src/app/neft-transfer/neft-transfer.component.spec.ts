import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeftTransferComponent } from './neft-transfer.component';

describe('NeftTransferComponent', () => {
  let component: NeftTransferComponent;
  let fixture: ComponentFixture<NeftTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NeftTransferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NeftTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
