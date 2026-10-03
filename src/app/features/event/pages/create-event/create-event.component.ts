import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EventService } from '../../service/event.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { ErrorsComponent } from '../../../../shared/components/errors/errors.component';
import { RouterLink } from '@angular/router';
import { IExceptions } from '../../../../core/interfaces/exception.interface';
import { CatalogueSelectionService } from '../../../templates/services/catalogues-selection.service';
import { toOffsetDateTime } from '../../../../shared/utils/time-zone.utils';

import { StepperModule } from 'primeng/stepper'
// import { StepperService } from 'primeng/api'
import { InputTextModule } from 'primeng/inputtext'
import {DatePicker } from 'primeng/datepicker'
import { Fluid } from 'primeng/fluid'
import { IconField } from 'primeng/iconfield'
import { InputIcon } from 'primeng/inputicon'
import { ButtonModule } from 'primeng/button'
import { CardModule } from 'primeng/card'
import { FileUpload } from 'primeng/fileupload'
import { SelectModule } from 'primeng/select'
import { ProgressSpinnerModule} from 'primeng/progressspinner'
import { MessageModule } from 'primeng/message';

interface UploadEvent {
	originalEvent: Event
	files: File[]
}

@Component({
	selector: 'wlk-create-event',
	imports: [
		FormsModule,
		CommonModule,
		StepperModule,
		InputTextModule,
		ButtonModule,
		CardModule,
		FileUpload,
		ProgressSpinnerModule,
		ErrorsComponent,
		RouterLink,
		MessageModule,
		SelectModule
	],
	templateUrl: './create-event.component.html',
	styleUrl: './create-event.component.css',
})
export class CreateEventComponent {

	private readonly destroyRef = inject(DestroyRef)
	private readonly eventService = inject(EventService)
	private readonly eventStorage = inject(CatalogueSelectionService)

	protected eventUuid = signal<string | null>(this.eventStorage.getEventUuid())

	activeStep= 1

	title = signal<string>('')
	description = signal<string>('')

	dateEventStart = signal< string>('')
	dateEventEnd = signal<string>('')

	protected invalidDateRange = computed(() => {
		const start = this.dateEventStart()
		const end = this.dateEventEnd()

		if (!start || !end){
			return false
		}

		return end < start
	})

	timezone = signal(Intl.DateTimeFormat().resolvedOptions().timeZone)
	// la liste des fuseaux horaires disponibles
	protected readonly timezones = 
		typeof Intl.supportedValuesOf === 'function'
			? Intl.supportedValuesOf('timeZone')
			: [
				'Africa/Kinshasa',
				'Africa/Lagos',
				'Africa/Johannesburg',
				'Europe/Paris',
				'Europe/London',
				'America/New_York'
			]

	address = signal<string>('')
	estimatedGuests = signal<number>(0)
	// image = signal<File>(<File>{})
	image =signal<string>('')

	uploadFIles: any[] = []

	protected isSubmitting = signal<boolean>(false)
	protected loading = signal<boolean>(false)
	protected error = signal<boolean>(false)
	protected errorContent = signal<IExceptions>(<IExceptions>{})
	protected submittedMessage= signal<string>('')
	protected created = signal<boolean>(false)
	

	protected isFormInvalid = computed(() => {
		return !this.title().trim() || !this.description().trim() || !this.dateEventStart() || !this.dateEventEnd() || !this.address().trim() || this.invalidDateRange()
	})

	protected stepPassTwo = computed(() => {
		return !this.title().trim() || !this.description().trim() || !this.dateEventStart() || !this.dateEventEnd() || this.invalidDateRange()
	})

	protected stepPassThree = computed(() =>{
		return !this.address().trim() || this.estimatedGuests() === 0
	})

	onStepTwo = signal<boolean>(false)

	submitEvent(): void {

		if (this.isFormInvalid()) return

		this.isSubmitting.set(true)
		this.loading.set(true)
		this.submittedMessage.set('Création de l\'événemt...')
		this.created.set(false)

		try {
			const eventTimezone = this.timezone()
			const dateEventStart = toOffsetDateTime(this.dateEventStart(), eventTimezone)
			const dateEventEnd = toOffsetDateTime(this.dateEventEnd(), eventTimezone)
	
			const payload = {
				title: this.title().trim(),
				description: this.description().trim(),
				dateEventStart,
				dateEventEnd,
				timezone: eventTimezone,
				address: this.address().trim(),
				estimatedGuests: this.estimatedGuests(),
				image: this.image()
			}
	
			console.log('event payload : ', payload)
	
			this.eventService.create(payload)
				.pipe(takeUntilDestroyed(this.destroyRef))
				.subscribe({
					next: (res) => {
						this.loading.set(false)
						this.created.set(true)
						this.submittedMessage.set('Événement créé')
						this.eventStorage.setEventUuid(res.uuid)
						console.log('create event res ok : ', res)
					},
					error: (err) => {
						this.isSubmitting.set(false)
						this.loading.set(false)
						this.error.set(true)
						console.log('create event error : ', err)
						this.submittedMessage.set('Echec de création de l\'événement.')
	
						const errorContent = {
							error: {message: 'Une erreur est survenue, veillez réessayez plus tard !'},
							name: err.name,
							status: err.status,
						}
						this.errorContent.set(errorContent)
					}
				})

		} catch (err){
			this.isSubmitting.set(false)
			this.loading.set(false)
			this.error.set(true)

			const errorContent = {
				error: {message: 'Erreur lors de la préparation des dates.'},
				name: 'Erreur Serveur',
				status: 500,
			}
			this.errorContent.set(errorContent)

			console.log('Erreur lors de la préparation des dates : ', err)
		}

	}

	onUpload(event: UploadEvent){
		for(let file of event.files){
			this.uploadFIles.push(file)
		}

		console.log(this.uploadFIles)
	}
}
