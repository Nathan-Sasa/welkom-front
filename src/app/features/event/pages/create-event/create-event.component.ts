import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EventService } from '../../service/event.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
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
import { ProgressSpinnerModule} from 'primeng/progressspinner'
import { ErrorsComponent } from '../../../../shared/components/errors/errors.component';
import { IExceptions } from '../../../../core/interfaces/exception.interface';

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
		ErrorsComponent
	],
	templateUrl: './create-event.component.html',
	styleUrl: './create-event.component.css',
})
export class CreateEventComponent {

	private readonly destroyRef = inject(DestroyRef)
	private readonly eventService = inject(EventService)

	activeStep= 1

	title = signal<string>('')
	description = signal<string>('')
	dateEventStart = signal< string>('')
	dateEventEnd = signal<string>('')
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
		return !this.title().trim() || !this.description().trim() || !this.dateEventStart() || !this.dateEventEnd() || !this.address().trim()
	})

	protected stepPassTwo = computed(() => {
		return !this.title().trim() || !this.description().trim() || !this.dateEventStart() || !this.dateEventEnd()
	})

	protected stepPassThree = computed(() =>{
		return !this.address().trim() || this.estimatedGuests() === 0
	})

	onStepTwo = signal<boolean>(false)

	submitEvent(): void {

		this.isSubmitting.set(true)
		this.loading.set(true)
		this.submittedMessage.set('Création de l\'événemt...')
		this.created.set(false)

		const payload = {
			title: this.title().trim(),
			description: this.description().trim(),
			dateEventStart: this.dateEventStart(),// + '.328Z',
			dateEventEnd: this.dateEventEnd(),// + '.328Z',
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
	}

	onUpload(event: UploadEvent){
		for(let file of event.files){
			this.uploadFIles.push(file)
		}

		console.log(this.uploadFIles)
	}
}
