import { Component, input } from '@angular/core';
import { IRsvpDashboardStat } from '../../interface/dashboard.interfaces'
import { CardModule } from 'primeng/card'
import { EntryAnimDirective } from '../../../../shared/directives/entry-anim.directive';

@Component({
	selector: 'wlk-rsvp-statistic',
	imports: [
		CardModule,
		EntryAnimDirective
	],
	templateUrl: './rsvp-statistic.component.html',
	styleUrl: './rsvp-statistic.component.css',
})
export class RsvpStatisticComponent {

	rsvpStat = input.required<IRsvpDashboardStat>() 
}
