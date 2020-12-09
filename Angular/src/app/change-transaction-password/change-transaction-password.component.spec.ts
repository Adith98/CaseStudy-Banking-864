import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeTransactionPasswordComponent } from './change-transaction-password.component';

describe('ChangeTransactionPasswordComponent', () => {
  let component: ChangeTransactionPasswordComponent;
  let fixture: ComponentFixture<ChangeTransactionPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeTransactionPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeTransactionPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
