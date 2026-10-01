import { Component, input } from '@angular/core';
import { EntryAnimDirective } from '../../../../shared/directives/entry-anim.directive';

@Component({
	selector: 'wlk-event-skeleton-card',
	imports: [
		EntryAnimDirective
	],
	templateUrl: './event-skeleton-card.component.html',
	styleUrl: './event-skeleton-card.component.css',
})
export class EventSkeletonCardComponent {
	cardNumber = input<number>(1)
}
