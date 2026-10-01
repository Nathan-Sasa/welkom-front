import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotionHeroComponent } from './motion-hero.component';

describe('MotionHeroComponent', () => {
  let component: MotionHeroComponent;
  let fixture: ComponentFixture<MotionHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MotionHeroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MotionHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
