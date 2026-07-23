import { Component } from '@angular/core';
import { HeaderComponent } from '../../layout/header/header.component';
import { HeroSectionComponent } from '../../features/landing/hero-section/hero-section.component';
import { TemplatesSectionComponent } from '../../features/landing/templates-section/templates-section.component';
import { FeaturesSectionComponent } from '../../features/landing/features-section/features-section.component';
import { CtaSectionComponent } from '../../features/landing/cta-section/cta-section.component';

@Component({
	selector: 'wlk-lading',
	imports: [
		HeaderComponent,
		HeroSectionComponent,
		TemplatesSectionComponent,
		FeaturesSectionComponent,
		CtaSectionComponent
	],
	templateUrl: './lading.component.html',
	styleUrl: './lading.component.css',
})
export class LadingComponent {

}
