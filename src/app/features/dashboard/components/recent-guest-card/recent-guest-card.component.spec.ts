import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentGuestCardComponent } from './recent-guest-card.component';

describe('RecentGuestCardComponent', () => {
  let component: RecentGuestCardComponent;
  let fixture: ComponentFixture<RecentGuestCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentGuestCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentGuestCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
