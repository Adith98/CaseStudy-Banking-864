import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RtgsTransferComponent } from './rtgs-transfer.component';

describe('RtgsTransferComponent', () => {
  let component: RtgsTransferComponent;
  let fixture: ComponentFixture<RtgsTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RtgsTransferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RtgsTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
