import { Component, computed, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router'
import { DashboardService } from '../../services/dashboard.service';
import { IRecentGuest, ITableDashboard } from '../../interface/dashboard.interfaces';
import { RecentGuestCardComponent } from '../../components/recent-guest-card/recent-guest-card.component';
import { GuestSkeletonComponent } from '../../components/guest-skeleton/guest-skeleton.component';
import { TableCardComponent } from '../../../../shared/components/table-card/table-card.component';
import { EntryAnimDirective } from '../../../../shared/directives/entry-anim.directive';

import { TagModule } from 'primeng/tag'
import { ButtonModule } from 'primeng/button'

@Component({
	selector: 'wlk-guest-table',
	imports: [
		RouterLink,
		RecentGuestCardComponent,
		GuestSkeletonComponent,
		TableCardComponent,
		TagModule,
		ButtonModule,
		EntryAnimDirective
	],
	templateUrl: './guest-table.component.html',
	styleUrl: './guest-table.component.css',
})
export class GuestTableComponent {

	protected eventUuid = inject(DashboardService).getEventStorage$()?.uuid

	loadingData = input.required<boolean>()
	errorData = input.required<boolean>()

	recentGuests = input.required<IRecentGuest[]>()
	tables = input.required<ITableDashboard[]>()

}
