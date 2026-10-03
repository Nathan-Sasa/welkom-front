import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RsvpEventCalendarComponent } from './rsvp-event-calendar.component';

describe('RsvpEventCalendarComponent', () => {
  let component: RsvpEventCalendarComponent;
  let fixture: ComponentFixture<RsvpEventCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RsvpEventCalendarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RsvpEventCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
