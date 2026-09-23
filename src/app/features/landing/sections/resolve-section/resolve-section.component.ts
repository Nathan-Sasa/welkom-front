import { Component } from '@angular/core';
import { Badge } from 'primeng/badge'
import { Avatar } from 'primeng/avatar'

@Component({
	selector: 'wlk-resolve-section',
	imports: [
		Badge,
		Avatar
	],
	templateUrl: './resolve-section.component.html',
	styleUrl: './resolve-section.component.css',
})
export class ResolveSectionComponent {

	problems = [
		{
			text: "Une liste d’invités sur WhatsApp."
		},
		{
			text: "Des confirmations dans plusieurs conversations."
		},
		{
			text: "Des invitations envoyées à droite et à gauche."
		},
		{
			text: "Des informations difficiles à retrouver."
		},
	]

	promises = [
		{
			icon: 'pi pi-chart-pie',
			text: 'Organisez.'
		},
		{
			icon: 'pi pi-pencil',
			text: 'Personnalisez.'
		},
		{
			icon: 'pi pi-users',
			text: 'Invitez.'
		},
		{
			icon: 'pi pi-eye',
			text: 'Suivez.'
		},
		{
			icon: 'pi pi-list-check',
			text: 'Accueillez.'
		},
	]
}


