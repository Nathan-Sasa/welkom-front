import { Component } from '@angular/core';
import { HeaderComponent } from '../../../layout/header/header.component';
import { HeroSectionComponent } from '../sections/hero-section/hero-section.component';
import { TemplatesSectionComponent } from '../sections/templates-section/templates-section.component';
import { FeaturesSectionComponent } from '../sections/features-section/features-section.component';
import { CtaSectionComponent } from '../sections/cta-section/cta-section.component';
import { Button } from 'primeng/button'
import { ResolveSectionComponent } from '../sections/resolve-section/resolve-section.component';

@Component({
	selector: 'wlk-lading',
	imports: [
		HeaderComponent,
		HeroSectionComponent,
		TemplatesSectionComponent,
		FeaturesSectionComponent,
		CtaSectionComponent,
		ResolveSectionComponent
	],
	templateUrl: './lading.component.html',
	styleUrl: './lading.component.css',
})
export class LadingComponent {

}
