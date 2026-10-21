import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { Router } from '@angular/router'
import { Location } from '@angular/common';
import { IGuestContactImported } from '../../interfaces/guest-imported';
import { CategoriesType, CATEGORY_STATUS, categoryLabels } from '../../../../core/types/category.type';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select'
import { InplaceModule } from 'primeng/inplace';
import { InputTextModule } from 'primeng/inputtext';
import { AutoFocusModule } from 'primeng/autofocus';
import { GuestService } from '../../services/guest.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DashboardService } from '../../../dashboard/services/dashboard.service';
import { IGuestRequestBatch } from '../../interfaces/guest.interface';

interface guestCategories {
	id: number
	name: (typeof categoryLabels)[keyof typeof categoryLabels]
	value: CategoriesType
}

type ContactField = 'firstName' | 'lastName' | 'email' | 'telephone'

@Component({
	selector: 'wlk-import',
	imports: [
		FormsModule,
		ButtonModule,
		SelectModule,
		InplaceModule,
		InputTextModule,
		AutoFocusModule
	],
	templateUrl: './import.component.html',
	styleUrl: './import.component.css',
})
export class ImportComponent {

	private readonly location = inject(Location)
	private readonly router = inject(Router)
	private readonly destroyRef = inject(DestroyRef)
	private readonly guestService = inject(GuestService)
	private readonly  eventUuid = inject(DashboardService).getEventStorage$()?.uuid 


	selectedFile = signal<File | null>(null);
	importedContacts = signal<IGuestContactImported[]>([])
	errorMessage = signal<string | null>(null);

	categoryField = signal<CategoriesType>('FAMILY')

	categories = signal<guestCategories[]>([
		{id: 1, name: categoryLabels.FAMILY, value: CATEGORY_STATUS.FAMILY},
		{id: 2, name: categoryLabels.FRIENDS, value: CATEGORY_STATUS.FRIENDS},
		{id:3, name: categoryLabels.COLLEAGUES, value: CATEGORY_STATUS.COLLEAGUES},
		{id: 4, name: categoryLabels.OTHER, value: CATEGORY_STATUS.OTHER},
	])

	invalidContactsCount = computed(() =>
		this.importedContacts().filter(contact =>
			this.isContactNameMissing(contact) ||
			this.isEmailInvalid(contact.email)
		).length
	);

	duplicateContactsCount = computed(() =>
		this.importedContacts().filter((_, index) =>
			this.isDuplicateContact(index)
		).length
	);

	canSubmit = computed(() =>
		this.importedContacts().length > 0 &&
		this.invalidContactsCount() === 0
	);

	goBack(): void {
		if(window.history.length > 1){
			this.location.back()
		} else {
			this.router.navigate(['/'])
		}
	}

	async onFileSelected(event: Event): Promise<void> {
		const input = event.target as HTMLInputElement;
		const file = input.files?.[0];

		this.errorMessage.set(null);
		this.selectedFile.set(null);
		this.importedContacts.set([])

		if (!file) {
			return;
		}

		const allowedExtensions = ['vcf', 'csv'];
		const extension = file.name.split('.').pop()?.toLowerCase();

		if (!extension || !allowedExtensions.includes(extension)) {
			this.errorMessage.set(
				'Format non accepté. Sélectionnez un fichier VCF ou CSV.'
			);
			input.value = '';
			return;
		}

		if (extension === 'vcf'){
			const content = await file.text();
			const contacts = this.parseVcf(content)

			this.importedContacts.set(contacts)
			console.log('Contacts analysées : ', contacts)
		}

		this.selectedFile.set(file);
	}

	removeFile(): void {
		this.selectedFile.set(null);
		this.errorMessage.set(null);
		this.importedContacts.set([])
	}

	private parseVcf(content: string): IGuestContactImported[] {
		const normalizedContent = content.replace(/\r\n/g, '\n');

		const cards = normalizedContent
			.split(/BEGIN:VCARD/i)
			.filter(card => card.trim().length > 0);

		const contacts: IGuestContactImported[] = [];

		for (const card of cards) {
			const lines = card
			.split('\n')
			.map(line => line.trim())
			.filter(line => line.length > 0);

			let firstName = '';
			let lastName = '';
			let email = '';
			let telephone = '';

			for (const line of lines) {
				const separatorIndex = line.indexOf(':');

				if (separatorIndex === -1) {
					continue;
				}

				const property = line
					.slice(0, separatorIndex)
					.split(';')[0]
					.toUpperCase();

				const value = line.slice(separatorIndex + 1).trim();
				switch (property) {
					case 'N': {
						const parts = value.split(';');
						lastName = parts[0] ?? '';
						firstName = parts[1] ?? '';
						break;
					}
					case 'FN':
						if (!firstName && !lastName) {
							const nameParts = value.split(/\s+/);
							firstName = nameParts.shift() ?? '';
							lastName = nameParts.join(' ');
						}
						break;
					case 'EMAIL':
						if (!email) {
							email = value;
						}
						break;
					case 'TEL':
						if (!telephone) {
							telephone = value;
						}
						break;
				}
			}

			// const category = CATEGORY_STATUS.FAMILY

			if (firstName || lastName || email || telephone) {
				contacts.push({
					firstName,
					lastName,
					email,
					telephone,
					category: 'FRIENDS'
				});
			}
		}
		return contacts;
	}



	updateContactCategory(index: number, category: CategoriesType): void {
		this.importedContacts.update(contacts =>
			contacts.map((contact, i) =>
				i === index
					? { ...contact, category }
					: contact
				)
		);
	}

	updateContact<K extends ContactField>(
		index: number,
		field: K,
		value: IGuestContactImported[K]
	): void {
		this.importedContacts.update(contacts =>
			contacts.map((contact, i) =>
			i === index
				? { ...contact, [field]: value }
				: contact
			)
		);
	}


	removeContact(index: number): void {
		this.importedContacts.update(contacts =>
			contacts.filter((_, i) => i !== index)
		);
	}


	isContactNameMissing(contact: IGuestContactImported): boolean {
		return !contact.firstName.trim() && !contact.lastName.trim();
	}


	isEmailInvalid(email: string): boolean {
		const value = email.trim();

		if (!value) {
			return false;
		}

		return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
	}


	private normalizeEmail(email: string): string {
		return email.trim().toLowerCase();
	}

	private normalizeTelephone(telephone: string): string {
		return telephone.replace(/[\s().-]/g, '');
	}


	isDuplicateContact(index: number): boolean {
		const contacts = this.importedContacts();
		const current = contacts[index];

		if (!current) {
			return false;
		}

		const email = this.normalizeEmail(current.email);
		const telephone = this.normalizeTelephone(current.telephone);

		if (!email && !telephone) {
			return false;
		}

		return contacts.some((contact, i) => {
			if (i === index) {
				return false;
			}

			const sameEmail =
				!!email &&
				this.normalizeEmail(contact.email) === email;

			const sameTelephone =
				!!telephone &&
				this.normalizeTelephone(contact.telephone) === telephone;

			return sameEmail || sameTelephone;
		});
	}







	// valueNotChange(index: number, value: string): boolean {
	// 	return this.importedContacts.
	// }

	saveImportedGuest(): void {
		
		if (!this.canSubmit()) return

		const  payload: IGuestRequestBatch = {
			guests : this.importedContacts()
		}

		console.log('guest batch : ', payload)
		
		this.guestService.createGuestBatch(payload)
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe({
				next: (res) => {
					console.log('create guest batch res : ', res)
					setTimeout(() => {
						void this.router.navigate(['/guest', this.eventUuid])
					})
				},
				error: (err) => {
					console.log('Create guest batch error : ', err)
				}
			})
	}

}
