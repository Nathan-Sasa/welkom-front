import { Component } from '@angular/core';

@Component({
	selector: 'app-hero-section',
	imports: [

	],
	templateUrl: './hero-section.component.html',
	styleUrl: './hero-section.component.css',
})
export class HeroSectionComponent {

	appDescription = {
		title: 'Vos invitations, du premier clic au contrôle du Jour J.',
		description: 'RSVPs numériques, gestion des invités et accès sécurisé par QR code. Simplifiez l\'organisation de vos moments précieux avec une élégance absolue.'
	}
}
