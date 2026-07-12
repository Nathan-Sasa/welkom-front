import { Component } from '@angular/core';

@Component({
	selector: 'app-templates-section',
	imports: [
		
	],
	templateUrl: './templates-section.component.html',
	styleUrl: './templates-section.component.css',
})
export class TemplatesSectionComponent {


	templates = [
		{name: 'Mariage floral de luxe', image: 'assets/images/invitation-templates/widding-template.png'},
		{name: 'Gala minimaliste', image: 'assets/images/invitation-templates/gala-template.png'},
		{name: 'Anniversaire moderne', image: 'assets/images/invitation-templates/birthday-template.png'},
		{name: 'template 4', image: ''},
		{name: 'template 5', image: ''},
		{name: 'template 6', image: ''},
	]
}
