import { Component, input } from '@angular/core';
import { EventStatus, IEventResponse } from '../../../features/event/interface/event.interface';
import { CommonModule } from '@angular/common';
import { AppInfo } from '../../utils/meta-data';

import {Card } from 'primeng/card'
import { BadgeModule } from 'primeng/badge';
import { PaymentStatus } from '../../../core/interfaces/payment.interface';
import { EntryAnimDirective } from '../../directives/entry-anim.directive';

@Component({
    selector: 'wlk-event-card',
    imports: [
		Card,
		CommonModule,
		BadgeModule,
		EntryAnimDirective
	],
    templateUrl: './event-card.component.html',
    styleUrl: './event-card.component.css',
})
export class EventCardComponent {
	event = input.required<IEventResponse>()
	defaultAvatar = AppInfo.defaultAvatar

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
}
