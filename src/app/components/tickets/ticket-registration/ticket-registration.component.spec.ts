import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketRegistrationComponent } from './ticket-registration.component';

describe('TicketRegistrationComponent', () => {
  let component: TicketRegistrationComponent;
  let fixture: ComponentFixture<TicketRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
