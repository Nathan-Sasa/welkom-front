import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelkomLogoComponent } from './welkom-logo.component';

describe('WelkomLogoComponent', () => {
  let component: WelkomLogoComponent;
  let fixture: ComponentFixture<WelkomLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WelkomLogoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WelkomLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
