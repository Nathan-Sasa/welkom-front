import { Component, input } from '@angular/core';
import { EntryAnimDirective } from '../../../../shared/directives/entry-anim.directive';
import { AvatarModule } from 'primeng/avatar';

type headerListType = true | 'none'

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

	hasHeader = input.required<boolean>()
	nbList = input.required<number[]>()
	hasBorder = input.required<boolean>()

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
