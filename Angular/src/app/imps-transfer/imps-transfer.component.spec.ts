import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpsTransferComponent } from './imps-transfer.component';

describe('ImpsTransferComponent', () => {
  let component: ImpsTransferComponent;
  let fixture: ComponentFixture<ImpsTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImpsTransferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpsTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
