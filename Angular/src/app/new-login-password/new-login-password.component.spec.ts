import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLoginPasswordComponent } from './new-login-password.component';

describe('NewLoginPasswordComponent', () => {
  let component: NewLoginPasswordComponent;
  let fixture: ComponentFixture<NewLoginPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewLoginPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewLoginPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
