import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'

import { ButtonModule } from 'primeng/button'
import { InputText } from 'primeng/inputtext';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { CheckingService } from '../../service/checking.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ButtonBackComponent } from '../../../../shared/components/button-back/button-back.component';

@Component({
	selector: 'wlk-event-auth',
	imports: [
		FormsModule,
		ButtonModule,
		IconField,
		InputText,
		InputIcon,
		ButtonBackComponent
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

	submit(): void {
		if (this.eventKeyInvalid() || this.submitting()) return

		if (this.isValidKey()) {
			this.isInvalidKey.set(true)
			return
		}

		this.submitting.set(true)

		const payload = {
			securityEventKey: this.eventKeyField().trim()
		}

		this.checkingService.connectEvent(payload)
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe({
				next: (res) => {
					console.log('event connexion ok', res)
					void this.router.navigate(['/checking/point'])
					this.submitting.set(false)
				},
				error: (err) => {
					this.submitting.set(false)
					console.log('event connexion error : ', err)
				}
			})
	}
}
