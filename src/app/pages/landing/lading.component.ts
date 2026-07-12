import { Component } from '@angular/core';
import { HeaderComponent } from '../../layout/header/header.component';
import { HeroSectionComponent } from '../../features/landing/hero-section/hero-section.component';
import { TemplatesSectionComponent } from '../../features/landing/templates-section/templates-section.component';
import { FeaturesSectionComponent } from '../../features/landing/features-section/features-section.component';

@Component({
	selector: 'app-lading',
	imports: [
		HeaderComponent,
		HeroSectionComponent,
		TemplatesSectionComponent,
		FeaturesSectionComponent
	],
	templateUrl: './lading.component.html',
	styleUrl: './lading.component.css',
})
export class LadingComponent {

	
}
