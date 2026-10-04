import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { IDashboard } from '../interface/dashboard.interfaces';
import { DashboardService } from '../services/dashboard.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '../../../core/auth/services/auth.service';
import { IExceptions } from '../../../core/interfaces/exception.interface';
import { from } from 'rxjs';
import { EntryAnimDirective } from '../../../shared/directives/entry-anim.directive';
import { ErrorsComponent } from '../../../shared/components/errors/errors.component';
import { RsvpEventCalendarComponent } from '../sections/rsvp-event-calendar/rsvp-event-calendar.component';
import { RsvpStatisticComponent } from '../sections/rsvp-statistic/rsvp-statistic.component';
import { EVENT_STATUS } from '../../event/interface/event.interface';
import { PAYMENT_STATUS } from '../../../core/types/payment.type';

import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog'
import { TagModule } from 'primeng/tag'
import { ToastModule } from 'primeng/toast'
import { ProgressSpinnerModule } from 'primeng/progressspinner'

@Component({
	selector: 'app-dashboard.component',
	imports: [
		RsvpStatisticComponent,
		RsvpEventCalendarComponent,
		ButtonModule,
		Dialog,
		ErrorsComponent,
		TagModule,
		ToastModule,
		EntryAnimDirective,
		ProgressSpinnerModule,
	],
	templateUrl: './dashboard.component.html',
	styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
	// provider: [MessageService]

	private readonly destroyRef = inject(DestroyRef)
	protected auth = inject(AuthService).currentUser
	private readonly dashboard = inject(DashboardService)
	private readonly message = inject(MessageService)

	protected data = signal<IDashboard>(<IDashboard>{})

	protected keyModal: boolean = false
	protected eventKey = signal<string>('')
	protected loadKey = signal<boolean>(true)
	protected keyFetching = false
	protected error = signal<boolean>(false)
	protected errorContent = signal<IExceptions >(<IExceptions>{})
	protected copyIcon = signal<boolean>(false)
	protected successCopy = signal<boolean>(false)


	simulate = {
		uuid: "62f162ae-97e9-4af9-8ebf-7687af2af9ae",
		title: "Mariage test offesetDateTime",
		description: "Description test offesetDateTime",
		location: "La salle",
		dateEventStart: "2026-10-30T18:00:00+01:00",
		dateEventEnd: "2026-10-30T23:00:00+01:00",
		timezone: "Africa/Kinshasa"
	}
	eventSimulate = {
		countGuests: 0,
		status: EVENT_STATUS.PENDING,
		paymentStatus: PAYMENT_STATUS.PENDING
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
					// console.log('event depuis storage : ', eventUuid)
				},
				error: (err) => {
					console.log('dashboard error : ', err)
				}
			})

	}

	getSecurityKey(): void {

		if (this.keyFetching) return

		// this.loadKey.set(true)

		this.dashboard.getSecurityKey(this.data().event.uuid)
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe({
				next: (key) => {
					this.eventKey.set(key.securityEventKey)
					this.error.set(false)
					// console.log('event key : ', key?.securityEventKey)
					this.keyFetching = true
					this.loadKey.set(false)
				},
				error: (err) => {
					this.keyFetching = true
					this.loadKey.set(false)

					const errorContent = {
						error: {message: err.status === 500 ? 'Une erreur est survenue, veillez réessayez plus tard !' : err.error.message},
						name: err.name,
						status: err.status,
					}
					this.errorContent.set(errorContent)
					this.error.set(true)

					// console.log('Key error : ', err)
				}
			})
	}

	copyToClipboard(){
		if (!this.eventKey()) return

		from(navigator.clipboard.writeText(this.eventKey()))
			.subscribe(() => {
				this.successCopy.set(true)
				this.message.add({
					severity: 'success',
					summary: 'Copié',
					detail: 'Clé copié dans le presse-papier'
				})
				setTimeout(() => {
					this.successCopy.set(false)
				}, 2000)
			})
	}

	regenerateEventKey() {
		this.keyFetching = false
		this.dashboard.regenerateEventKey(this.data().event.uuid)
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe({
				next: (key) => {
					this.eventKey.set(key.securityEventKey)
					this.keyFetching = true

					// console.log('regenerate key : ', key)
				},
				error: (err) => {
					this.keyFetching = true

					const errorContent = {
						error: {message: err.status === 500 ? 'Une erreur est survenue, veillez réessayez plus tard !' : err.error.message},
						name: err.name,
						status: err.status,
					}
					this.errorContent.set(errorContent)
					this.error.set(true)

					console.log('regenerate key error : ', err)
				}
			})
	}


	//methode test temporaire pour activer un event avant paiement
	activateEvent(): void {
		this.dashboard.activateEvent(this.data().event.uuid)
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe({
				next: (res) => {
					this.keyFetching = false
					this.getSecurityKey()
					// console.log('Active ok : ',res)
					// this.error.set(false)
					// this.errorContent.set(null)
					this.loadDashboard()
				},
				error: (err) => {
					console.log('active key error : ', err)
					const errorContent = {
						error: {message: err.status === 500 ? 'Une erreur est survenue, veillez réessayez plus tard !' : err.error.message},
						name: err.name,
						status: err.status,
					}
					this.errorContent.set(errorContent)
					this.error.set(true)
					this.message.add({
						severity: 'danger',
						summary: 'Erreur',
						detail: 'Une est survenue lors de la régénération de votre clé'
					})
				}
			})
	}
}
