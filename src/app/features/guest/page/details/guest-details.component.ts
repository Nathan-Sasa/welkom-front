import { Component, computed, DestroyRef, effect, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { GuestService } from '../../services/guest.service';
import { IGuestDetails, IUpdateGuestDetails } from '../../interfaces/guest.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EntryAnimDirective } from '../../../../shared/directives/entry-anim.directive';
import { toBackgroundRsvp, toColorRsvp, toFrenchRsvp } from '../../../../shared/utils/rsvpTranslate';
import { CategoriesType, CATEGORY_STATUS, categoryLabels } from '../../../../core/types/category.type';
import { RsvpCategory, RsvpType } from '../../../../core/types/rsvp.type';
import { DatePipe, Location } from '@angular/common';
import { Router } from '@angular/router';
import { toFrenchCategory } from '../../../../shared/utils/guestCategoriesTranslate';

import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InplaceModule } from 'primeng/inplace';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { AutoFocusModule } from 'primeng/autofocus';

interface guestCategories {
    id: number
    name: (typeof categoryLabels)[keyof typeof categoryLabels]
    value: CategoriesType
}

@Component({
	selector: 'wlk-guest-details',
	imports: [
		FormsModule,
		EntryAnimDirective,
		ButtonModule,
		AvatarModule,
		DividerModule,
		DatePipe,
		InplaceModule,
		InputTextModule,
		SelectModule,
		AutoFocusModule
	],
	templateUrl: './guest-details.component.html',
	styleUrl: './guest-details.component.css',
})
export class GuestDetailsComponent {

	private readonly guestService = inject(GuestService)
	private readonly destroyRef = inject(DestroyRef)
	private readonly location = inject(Location) 
	private readonly router = inject(Router)

	eventUuid = input<string>()
	guestUuid = input<string>()

	getEventUuid = signal<string>('')
	getGuestUuid = signal<string>('')
	
	protected guest = signal<IGuestDetails>(<IGuestDetails>{})
	loading = signal<boolean>(true)
	submitting = signal<boolean>(false)

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
					// console.log('guest updated : ', res)
					this.guest.set(res)

					this.firstNameField.set(res.firstName || '')
					this.lastNameField.set(res.lastName || '')
					this.telephoneField.set(res.telephone || '')
					this.emailField.set(res.email || '')
					this.categoryField.set(res.category || 'FAMILY')
					this.rsvpField.set(res.rsvp || 'PENDING')
				},
				error: (err) => {
					console.log('guest update error : ', err)
				}
			})	
	}

}
