import { Component, computed, DestroyRef, effect, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { GuestService } from '../../services/guest.service';
import { IGuestDetails, IUpdateGuestDetails } from '../../interfaces/guest.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EntryAnimDirective } from '../../../../shared/directives/entry-anim.directive';
import { toBackgroundRsvp, toColorRsvp, toFrenchRsvp } from '../../../../shared/utils/rsvpTranslate';
import { CategoriesType, CATEGORY_STATUS, categoryLabels } from '../../../../core/types/category.type';
import { RsvpCategory, RsvpType } from '../../../../core/types/rsvp.type';
import { DatePipe, Location, NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { toFrenchCategory } from '../../../../shared/utils/guestCategoriesTranslate';
import { IAssignTableGuest, ITableName } from '../../../table/interface/table.interfaces';
import { TableService } from '../../../table/service/table.service';
import { IExceptions } from '../../../../core/interfaces/exception.interface';
import { ErrorsComponent } from '../../../../shared/components/errors/errors.component';

import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InplaceModule } from 'primeng/inplace';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { AutoFocusModule } from 'primeng/autofocus';
import { selectTable } from '../../../../core/interfaces/table.interface';
import { TagModule } from 'primeng/tag'

interface guestCategories {
    id: number
    name: (typeof categoryLabels)[keyof typeof categoryLabels]
    value: CategoriesType
}

type updatingGuest = 'none' | 'updating' | 'updated' | 'error'
type submittedState = 'none' | 'submitted'

@Component({
	selector: 'wlk-guest-details',
	imports: [
		FormsModule,
		NgClass,
		EntryAnimDirective,
		ButtonModule,
		AvatarModule,
		DividerModule,
		DatePipe,
		InplaceModule,
		InputTextModule,
		SelectModule,
		AutoFocusModule,
		TagModule,
		ErrorsComponent
	],
	templateUrl: './guest-details.component.html',
	styleUrl: './guest-details.component.css',
})
export class GuestDetailsComponent {

	private readonly destroyRef = inject(DestroyRef)
	private readonly location = inject(Location) 
	private readonly router = inject(Router)
	private readonly guestService = inject(GuestService)
	private readonly tableService = inject(TableService)

	eventUuid = input<string>()
	guestUuid = input<string>()

	getEventUuid = signal<string>('')
	getGuestUuid = signal<string>('')
	
	protected guest = signal<Partial<IGuestDetails>>(<IGuestDetails>{})
	protected loading = signal<boolean>(true)
	protected submitting = signal<boolean>(false)
	protected submitted = signal<submittedState>('none')
	protected submittingError = signal<boolean>(false)
	protected errorContent = signal<IExceptions>(<IExceptions>{})

	protected updatingGuest = signal<updatingGuest>('none')
	updatingMessage = signal<string>('')

	firstNameField = signal<string>('')
	firstNameFieldInvalid = computed(() => {
		const firstName = this.firstNameField()
		return !firstName || firstName === this.guest()?.firstName
	})

	lastNameField = signal<string>(this.guest()?.lastName || '')
	lastNameFieldInvalid = computed(() => {
		const lastName = this.lastNameField()
		return !lastName || lastName === this.guest()?.lastName
	})

	telephoneField = signal<string>(this.guest()?.telephone || '')
	telephoneFieldInvalid = computed(() => {
		const telephone = this.telephoneField()
		return !telephone || !/^\+?\d{10,15}$/.test(telephone) || telephone === this.guest()?.telephone
	})

	emailField = signal<string>(this.guest()?.email || '')
	emailFieldInvalid = computed(() => {
		const email = this.emailField()
		return !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email === this.guest()?.email
	})

	categoryField = signal<CategoriesType>(this.guest()?.category || 'FAMILY')
	categoryFieldInvalid = computed(() => {
		const category = this.categoryField()
		return !category || category === this.guest()?.category
	})

	categories = signal<guestCategories[]>([
		// {id: 5, name: categoryLabels.ALL, value: CATEGORY_STATUS.ALL},
		{id: 1, name: categoryLabels.FAMILY, value: CATEGORY_STATUS.FAMILY},
		{id: 2, name: categoryLabels.FRIENDS, value: CATEGORY_STATUS.FRIENDS},
		{id:3, name: categoryLabels.COLLEAGUES, value: CATEGORY_STATUS.COLLEAGUES},
		{id: 4, name: categoryLabels.OTHER, value: CATEGORY_STATUS.OTHER},
	])

	protected tables = signal<selectTable[]>([])

	table = signal<ITableName>(<ITableName>{})
	tableFieldInvalid = computed(() => {
		return !this.table().tableName || this.table().tableName === this.guest()?.tableName
	})

	rsvpField = signal<RsvpType>(this.guest()?.rsvp || 'PENDING')
	rsvpFieldInvalid = computed(() => {
		const rsvp = this.rsvpField()
		return !rsvp || rsvp === this.guest()?.rsvp
	})


	constructor(){
		effect(() => {
			const event = this.eventUuid()
			const guestUuid = this.guestUuid()

			if (event && guestUuid){
				this.getEventUuid.set(event)
				this.getGuestUuid.set(guestUuid)

				this.guestService.getGuestDetails(event, guestUuid)
					.pipe(takeUntilDestroyed(this.destroyRef))
					.subscribe({
						next: (guest) => {
							// console.log('guest res : ', guest)
							this.guest.set(guest)

							this.firstNameField.set(guest.firstName || '')
							this.lastNameField.set(guest.lastName || '')
							this.telephoneField.set(guest.telephone || '')
							this.emailField.set(guest.email || '')
							this.categoryField.set(guest.category || 'FAMILY')
							this.rsvpField.set(guest.rsvp || 'PENDING')
							this.table.set({uuid: '' ,tableName: guest.tableName})
							this.loading.set(false)
						}
					})

			}
		})
	}

	goBack(): void {
		if(window.history.length > 1){
			this.location.back()
		} else {
			this.router.navigate(['/'])
		}
	}

	frenchCategory(category: CategoriesType): string {
		return toFrenchCategory(category)
	}

	rsvpFrench(rsvp: RsvpType): string {
		return toFrenchRsvp(rsvp)
	}

	colorRsvp(rsvp: RsvpType): string {
		return toColorRsvp(rsvp)
	}

	backgroundRsvp(rsvp: RsvpType): string {
		return toBackgroundRsvp(rsvp)
	}


	updateGuestDetails(): void {

		if (this.submitting()) return

		this.submitting.set(true)
		this.submitted.set('none')
		this.updatingGuest.set('updating')
		this.updatingMessage.set('Modification d\'informations de l\invité(e).')
		this.submittingError.set(false)

		const payload: IUpdateGuestDetails = {
			firstName: !this.firstNameFieldInvalid() ? this.firstNameField().trim() : undefined,
			lastName: !this.lastNameFieldInvalid() ? this.lastNameField().trim() : undefined,
			telephone: !this.telephoneFieldInvalid() ? this.telephoneField().trim() : undefined,
			email: !this.emailFieldInvalid() ? this.emailField().trim() : undefined,
			category: !this.categoryFieldInvalid() ? this.categoryField() : undefined
		}

		this.guestService.updateGuest(this.getEventUuid(), this.getGuestUuid(), payload)
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe({
				next: (res) => {
					this.guest.set(res)

					this.firstNameField.set(res.firstName || '')
					this.lastNameField.set(res.lastName || '')
					this.telephoneField.set(res.telephone || '')
					this.emailField.set(res.email || '')
					this.categoryField.set(res.category || 'FAMILY')
					this.rsvpField.set(res.rsvp || 'PENDING')
					
					this.submitted.set('submitted')
					setTimeout(() => {
						this.updatingGuest.set('updated')
						this.updatingMessage.set('Informations de l\'invité(e) modifiées.')
						this.submitting.set(false)
					}, 1000)
				},
				error: (err) => {
					this.submittingError.set(true)
					this.submitted.set('submitted')
					this.updatingGuest.set('error')
					this.updatingMessage.set('Echec de la modification de l\'invité(e).')
					const errorContent: IExceptions = {
						error: {message: err.status === 500 ? 'Une erreur est survenue, veillez réessayez plus tard !' : err.error.message},
						name: err.name,
						status: err.status,
					}
					this.errorContent.set(errorContent)
					console.log('guest update error : ', err)
				}
			})	
	}

	loadTable(): void {
		this.tableService.getTableSpace()
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe({
				next: (tables) => {

					const itable = tables.map((item, index) => {
						const table = {
							id: index + 1,
							name: item.tableName,
							value: {
								uuid: item.uuid,
								tableName: item.tableName
							}
						}
						return table
					})

					this.tables.set(itable)
				},
				error: (err) => {
					console.log('table error : ', err)
				}
			})
	}

	assignTable(): void {
		if (!this.guest() || this.tableFieldInvalid()) return

		this.submitting.set(true)
		this.submittingError.set(false)
		this.updatingGuest.set('updating')
		this.updatingMessage.set('Modification d\'informations de l\invité(e).')

		const guestAssignPayload: IAssignTableGuest = {
			tableName: this.table().tableName,
			guestUuid: this.guestUuid() as string
		}
		this.tableService.assignGuestTable(guestAssignPayload, this.table().uuid)
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe({
				next: () => {
					this.submitted.set('submitted')

					setTimeout(() => {
						this.updatingGuest.set('updated')
						this.updatingMessage.set('Informations de l\'invité(e) modifiées.')
						this.submitting.set(false)
						this.submittingError.set(false)
					}, 1000)

					// this.guest.set({
					// 	tableName: this.table().tableName
					// })
					console.log('assigned table ')
				},
				error: (err) => {
					this.submitting.set(false)
					this.submitted.set('submitted')
					this.submittingError.set(true)
					this.updatingGuest.set('error')
					this.updatingMessage.set('Echec de la modification de l\'invité(e).')
					
					const errorContent: IExceptions = {
						error: {message: err.status === 500 ? 'Une erreur est survenue, veillez réessayez plus tard !' : err.error.message},
						name: err.name,
						status: err.status,
					}
					this.errorContent.set(errorContent)
					console.log('assign table error : ', err)
				}
			})
	}

	assignTableStateIcon(): string{
		switch(this.updatingGuest()){
			case 'updating':
				return 'pi pi-spinner-dotted'
			case 'updated':
				return 'pi pi-check'
			case 'error':
				return 'pi pi-times'
			default:
				return 'pi pi-spinner-dotted'
		}
	}

}
