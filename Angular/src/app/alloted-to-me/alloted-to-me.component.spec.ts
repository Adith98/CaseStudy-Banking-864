import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllotedToMeComponent } from './alloted-to-me.component';

describe('AllotedToMeComponent', () => {
  let component: AllotedToMeComponent;
  let fixture: ComponentFixture<AllotedToMeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllotedToMeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllotedToMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
