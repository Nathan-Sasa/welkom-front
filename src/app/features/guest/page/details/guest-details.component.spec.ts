import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestDetailsComponent } from './guest-details.component';

describe('GuestDetailsComponent', () => {
  let component: GuestDetailsComponent;
  let fixture: ComponentFixture<GuestDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuestDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
