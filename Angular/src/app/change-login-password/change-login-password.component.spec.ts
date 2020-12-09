import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeLoginPasswordComponent } from './change-login-password.component';

describe('ChangeLoginPasswordComponent', () => {
  let component: ChangeLoginPasswordComponent;
  let fixture: ComponentFixture<ChangeLoginPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeLoginPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeLoginPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
