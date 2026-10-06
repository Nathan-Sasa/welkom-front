import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestSkeletonListComponent } from './guest-skeleton-list.component';

describe('GuestSkeletonListComponent', () => {
  let component: GuestSkeletonListComponent;
  let fixture: ComponentFixture<GuestSkeletonListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuestSkeletonListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuestSkeletonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
