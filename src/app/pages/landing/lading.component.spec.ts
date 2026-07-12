import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LadingComponent } from './lading.component';

describe('LadingComponent', () => {
  let component: LadingComponent;
  let fixture: ComponentFixture<LadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LadingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
