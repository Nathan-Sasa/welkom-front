import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { RsvpEventCalendarComponent } from '../sections/rsvp-event-calendar/rsvp-event-calendar.component';
import { simulateDashboardDate } from '../../../shared/utils/simulate-data';
import { IDashboard } from '../interface/dashboard.interfaces';
import { DashboardService } from '../services/dashboard.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '../../../core/auth/services/auth.service';

@Component({
	selector: 'app-dashboard.component',
	imports: [
		RsvpEventCalendarComponent
	],
	templateUrl: './dashboard.component.html',
	styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {

	private readonly dashboard = inject(DashboardService)
	private readonly destroyRef = inject(DestroyRef)

	protected auth = inject(AuthService).currentUser

	protected data = signal<IDashboard>(<IDashboard>{})


	simulate = {
		uuid: "62f162ae-97e9-4af9-8ebf-7687af2af9ae",
		title: "Mariage test offesetDateTime",
		description: "Description test offesetDateTime",
		location: "La salle",
		dateEventStart: "2026-10-30T18:00:00+01:00",
		dateEventEnd: "2026-10-30T23:00:00+01:00",
		timezone: "Africa/Kinshasa"
	}


	ngOnInit(): void {
		this.loadDashboard()
	}

	loadDashboard(): void {

		const eventUuid = this.dashboard.getEventStorage$()

		if (!eventUuid) return

		this.dashboard.getDashboardData(eventUuid.uuid)
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe({
				next: (res) => {
					this.data.set(res)
					console.log('dashboard data : ', res)
				},
				error: (err) => {
					console.log('dashboard error : ', err)
				}
			})

	}
}
