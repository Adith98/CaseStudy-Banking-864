import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternetBankingComponent } from './internet-banking.component';

describe('InternetBankingComponent', () => {
  let component: InternetBankingComponent;
  let fixture: ComponentFixture<InternetBankingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternetBankingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InternetBankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
 
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
