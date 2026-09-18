import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EventService } from '../../service/event.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'wlk-create-event',
	imports: [
		FormsModule,
		CommonModule
	],
	templateUrl: './create-event.component.html',
	styleUrl: './create-event.component.css',
})
export class CreateEventComponent {

	private readonly destroyRef = inject(DestroyRef)
	private readonly eventService = inject(EventService)

	title = signal<string>('')
	description = signal<string>('')
	dateEvent = signal<string>('')
	color = signal<string>('')

	isSubmitting = signal<boolean>(false)

	isFormInvalid = computed(() => {
		return !this.title().trim() || !this.description().trim() || !this.dateEvent().trim()
	})

	saveStep1(): void {

		this.isSubmitting.set(true)

		const payload = {
			title: this.title().trim(),
			description: this.description().trim(),
			dateEvent: this.dateEvent().trim(),
			color: this.color()
		}

		console.log('event payload : ', payload)

		this.eventService.create(payload)
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe({
				next: (res) => {
					console.log('create event res ok : ', res)
				},
				error: (err) => {
					this.isSubmitting.set(false)
					console.log('create event error : ', err)
				}
			})
	}
}
