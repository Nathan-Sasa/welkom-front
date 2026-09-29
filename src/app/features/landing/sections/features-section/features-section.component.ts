import { Component } from '@angular/core';
import { Avatar } from 'primeng/avatar'

@Component({
	selector: 'wlk-features-section',
	imports: [
		Avatar
	],
	templateUrl: './features-section.component.html',
	styleUrl: './features-section.component.css',
})
export class FeaturesSectionComponent {

	checkListRsvp = [
		{text: 'Export CSV facile', icon: 'pi pi-check'},
		{text: 'Rappels automatiques', icon: 'pi pi-check'},
		{text: 'Statistiques de présence', icon: 'pi pi-check'},
	]

	promises = [
		{icon: 'pi pi-calendar-clock', title: 'Identité Visuelle Unique', text: 'Personnalisez chaque détail pour que votre invitation numérique reflète parfaitement l\'atmosphère de votre événement.'},
		{icon: '', title: 'Performance Éditoriale', text: 'Une expérience fluide sur tous les supports. Vos invités accèdent aux informations instantanément, sans friction.'},
		{icon: 'pi pi-palette', title: 'Données Privées', text: 'La confidentialité est au cœur de Welkom. Les informations de vos invités sont chiffrées et protégées.'},
		{icon: '', title: 'Données Privées', text: 'La confidentialité est au cœur de Welkom. Les informations de vos invités sont chiffrées et protégées.'},
	]
}
