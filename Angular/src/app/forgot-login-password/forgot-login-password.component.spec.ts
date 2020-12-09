import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotLoginPasswordComponent } from './forgot-login-password.component';

describe('ForgotLoginPasswordComponent', () => {
  let component: ForgotLoginPasswordComponent;
  let fixture: ComponentFixture<ForgotLoginPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotLoginPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotLoginPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
