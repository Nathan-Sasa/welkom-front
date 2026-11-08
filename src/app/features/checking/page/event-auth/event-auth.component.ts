import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'

import { ButtonModule } from 'primeng/button'
import { InputText } from 'primeng/inputtext';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { CheckingService } from '../../service/checking.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
	selector: 'wlk-event-auth',
	imports: [
		FormsModule,
		ButtonModule,
		IconField,
		InputText,
		InputIcon
	],
	templateUrl: './event-auth.component.html',
	styleUrl: './event-auth.component.css',
})
export class EventAuthComponent {

	private readonly destroyRef = inject(DestroyRef)
	private readonly router = inject(Router)
	private readonly checkingService = inject(CheckingService)

	protected eventKeyField = signal<string>('')

	protected readonly eventKeyInvalid = computed(() => {
		return !this.eventKeyField().trim()
	})

	protected readonly isValidKey = computed(() => {
		const formatEventKey = this.eventKeyField().trim().split('-')
		const eventKeyPrefix = formatEventKey[0]
		const isInvalidPrefix = eventKeyPrefix !== 'wlk'

		return isInvalidPrefix || this.eventKeyField().trim().length !== 18 
	})

	protected readonly invalidKeyMessage = 'Veillez entrer une clé valide.'
	protected isInvalidKey = signal<boolean>(false)

	protected submitting = signal<boolean>(false)

	// constructor() {
	// 	this.checkingService.getCheckingAccess()
	// 		.pipe(takeUntilDestroyed(this.destroyRef))
	// 		.subscribe({
	// 			next: (res) => {
	// 				console.log('get access checking res: ', res)
	// 			},
	// 			error: (err) => {
	// 				console.log('get access checking err', err)
	// 			}
	// 		})
		
	// 		console.log('get access method : ', this.checkingService.signAccessChecking())
	// }

	submit(): void {
		if (this.eventKeyInvalid() || this.submitting()) return

		if (this.isValidKey()) {
			// console.log('invalid key : ', this.eventKeyField())
			this.isInvalidKey.set(true)
			return
		}

		const payload = {
			securityEventKey: this.eventKeyField().trim()
		}

		this.checkingService.connectEvent(payload)
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe({
				next: () => {
					console.log('event connexion ok')
					void this.router.navigate(['/checking/point'])
				},
				error: (err) => {
					console.log('event connexion error : ', err)
				}
			})
	}
}
