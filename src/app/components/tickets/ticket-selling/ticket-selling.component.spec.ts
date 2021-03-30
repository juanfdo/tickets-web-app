import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketSellingComponent } from './ticket-selling.component';

describe('TicketSellingComponent', () => {
  let component: TicketSellingComponent;
  let fixture: ComponentFixture<TicketSellingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketSellingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketSellingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
