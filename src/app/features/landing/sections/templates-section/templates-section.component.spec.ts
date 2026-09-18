import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatesSectionComponent } from './templates-section.component';

describe('TemplatesSectionComponent', () => {
  let component: TemplatesSectionComponent;
  let fixture: ComponentFixture<TemplatesSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplatesSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemplatesSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
