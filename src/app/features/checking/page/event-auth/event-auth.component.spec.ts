import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventAuthComponent } from './event-auth.component';

describe('EventAuthComponent', () => {
  let component: EventAuthComponent;
  let fixture: ComponentFixture<EventAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventAuthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
