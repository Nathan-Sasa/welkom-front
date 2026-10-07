import { Component, input } from '@angular/core';
import { IGuest } from '../../interfaces/guest.interface';
import { Avatar } from 'primeng/avatar';
import { EntryAnimDirective } from '../../../../shared/directives/entry-anim.directive';
import { toFrenchCategory } from '../../../../shared/utils/guestCategoriesTranslate';
import { CategoriesType } from '../../../../core/types/category.type';
import { RsvpCategory, RsvpType } from '../../../../core/types/rsvp.type';
import { toBackgroundRsvp, toColorRsvp, toFrenchRsvp } from '../../../../shared/utils/rsvpTranslate';

@Component({
	selector: 'wlk-guest-list',
	imports: [
		Avatar,
		EntryAnimDirective
	],
	templateUrl: './guest-list.component.html',
	styleUrl: './guest-list.component.css',
})
export class GuestListComponent {

	guests = input.required<IGuest[]>()
	loading = input.required<boolean>()

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

	frenchCategory(category: CategoriesType): string {
		return toFrenchCategory(category)
	}

	frenchRsvp(rsvp: RsvpType): string {
		return toFrenchRsvp(rsvp)
	}

	colorRsvp(rsvp: RsvpType): string{
		return toColorRsvp(rsvp)
	}
	
	backgroundRsvp(rsvp: RsvpType): string {
		return toBackgroundRsvp(rsvp)
	}
}
