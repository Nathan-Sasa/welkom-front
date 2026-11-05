import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckingPointComponent } from './checking-point.component';

describe('CheckingPointComponent', () => {
  let component: CheckingPointComponent;
  let fixture: ComponentFixture<CheckingPointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckingPointComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckingPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
