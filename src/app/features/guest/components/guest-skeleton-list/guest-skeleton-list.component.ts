import { Component } from '@angular/core';
import { EntryAnimDirective } from '../../../../shared/directives/entry-anim.directive';
import { AvatarModule } from 'primeng/avatar';

@Component({
    selector: 'wlk-guest-skeleton-list',
    imports: [
		EntryAnimDirective,
		AvatarModule
	],
    templateUrl: './guest-skeleton-list.component.html',
    styleUrl: './guest-skeleton-list.component.css',
})
export class GuestSkeletonListComponent {

	listHead = [
		{ id: 1, name: '' },
		{ id: 2, name: 'Nom' },
		{ id: 3, name: 'Téléphone' },
		{ id: 4, name: 'Email' },
		{ id: 5, name: 'Catégorie' },
		{ id: 6, name: 'Table' },
		{ id: 7, name: 'Rsvp' },
		{ id: 8, name: 'Invitation' },
	]
}
