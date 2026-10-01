import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventSkeletonCardComponent } from './event-skeleton-card.component';

describe('EventSkeletonCardComponent', () => {
  let component: EventSkeletonCardComponent;
  let fixture: ComponentFixture<EventSkeletonCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventSkeletonCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventSkeletonCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
