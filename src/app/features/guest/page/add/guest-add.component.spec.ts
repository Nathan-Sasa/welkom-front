import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestAddComponent } from './guest-add.component';

describe('GuestAddComponent', () => {
  let component: GuestAddComponent;
  let fixture: ComponentFixture<GuestAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuestAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuestAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
