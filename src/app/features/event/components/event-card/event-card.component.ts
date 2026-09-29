import { Component, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { EventStatus, IEventResponse } from '../../interface/event.interface';
import { CommonModule } from '@angular/common';
import { AppInfo } from '../../../../shared/utils/meta-data';

import { BadgeModule } from 'primeng/badge';
import { PaymentStatus } from '../../../../core/interfaces/payment.interface';
import { EntryAnimDirective } from '../../../../shared/directives/entry-anim.directive';

@Component({
    selector: 'wlk-event-card',
    imports: [
		CommonModule,
		BadgeModule,
		EntryAnimDirective
	],
    templateUrl: './event-card.component.html',
    styleUrl: './event-card.component.css',
})
export class EventCardComponent {

	private readonly router = inject(Router)

	event = input.required<IEventResponse>()
	defaultAvatar = AppInfo.defaultAvatar

	eventStorage = 'eventStorage'

	eventStatusFr(eventStatus: EventStatus): string {
		switch(eventStatus){
			case 'PENDING':
				return 'À venir'
			case 'CANCELED':
				return 'Annulé'
			case 'CONFIRMED':
				return 'Encours'
			case 'DRAFT':
				return 'Suspendu'
			default:
				return 'À venir'
		}
	}

	eventSeverity(eventStatus: EventStatus): "info" | "success" | "warn" | "danger" | "secondary" | "contrast" {
		switch(eventStatus){
			case 'PENDING':
				return 'info'
			case 'CANCELED':
				return 'danger'
			case 'CONFIRMED':
				return 'success'
			case 'DRAFT':
				return 'warn'
			default:
				return 'info'
		}
	}

	paymentStatusFr(paymentStatus: PaymentStatus): string{
		switch(paymentStatus){
			case 'PENDING':
				return 'En attente'
			case 'PAYMENT_SUCCESS':
				return 'Activée'
			case 'PAYMENT_FAILED':
				return 'Échouée'
			default:
				return 'En attente'
		}
	}

	paymentSeverity(paymentStatus: PaymentStatus): "info" | "success" | "warn" | "danger" | "secondary" | "contrast" {
		switch(paymentStatus){
			case 'PENDING':
				return 'info'
			case 'PAYMENT_SUCCESS':
				return 'success'
			case 'PAYMENT_FAILED':
				return 'danger'
			default:
				return 'warn'
		}
	}


	goDashboard(event: IEventResponse){
		if(!event) return

		localStorage.setItem(this.eventStorage, JSON.stringify(event))
		console.log('event storage : ', event)
		this.router.navigate(['/dashboard', event.uuid])
	}
}
