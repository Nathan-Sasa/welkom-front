import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckPointComponent } from './check-point.component';

describe('CheckPointComponent', () => {
  let component: CheckPointComponent;
  let fixture: ComponentFixture<CheckPointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckPointComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
