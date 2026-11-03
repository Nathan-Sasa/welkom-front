import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardService } from '../../../dashboard/services/dashboard.service';
import { GuestService } from '../../services/guest.service';
import { TableService } from '../../../table/service/table.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { CategoriesType, CATEGORY_STATUS, categoryLabels, guestCategories } from '../../../../core/types/category.type';
import { ITableName, IAssignTableGuest } from '../../../table/interface/table.interfaces';
import { selectTable } from '../../../../core/interfaces/table.interface';
import { isEmailInvalid, normalizeTelephone } from '../../../../shared/utils/normalize-format.utils';
import { IGuest, IGuestRequest } from '../../interfaces/guest.interface';
import { IExceptions } from '../../../../core/interfaces/exception.interface';
import { ErrorsComponent } from '../../../../shared/components/errors/errors.component';
import { EntryAnimDirective } from '../../../../shared/directives/entry-anim.directive';

import { ButtonModule } from 'primeng/button';
import { Avatar } from 'primeng/avatar'
import { InputText } from 'primeng/inputtext';
import { InputIcon } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';
import { Select } from 'primeng/select';

type addGuestState = 'none' | 'submit'
type guestCreatingState = 'none' | 'creating' | 'created' | 'error'
type tableAssigning = 'none' | 'assigning' | 'assigned' | 'error'

@Component({
	selector: 'wlk-guest-add',
	imports: [
		ButtonModule,
		FormsModule,
		CommonModule,
		Avatar,
		IconField,
		InputText,
		InputIcon,
		Select,
		ErrorsComponent,
		EntryAnimDirective, 
	],
	templateUrl: './guest-add.component.html',
	styleUrl: './guest-add.component.css',
})
export class GuestAddComponent implements OnInit {

	private readonly location = inject(Location)
	private readonly router = inject(Router)
	private readonly destroyRef = inject(DestroyRef)
	private readonly eventUuid = inject(DashboardService).getEventStorage$()?.uuid
	private readonly guestService = inject(GuestService)
	private readonly tableService = inject(TableService)

	firstName = signal<string>('')
	lastName = signal<string>('')
	email = signal<string>('')
	telephone = signal<string>('')
	category = signal<CategoriesType>('FAMILY')
	table = signal<ITableName>(<ITableName>{})

	categories = signal<guestCategories[]>([
		{id: 1, name: categoryLabels.FAMILY, value: CATEGORY_STATUS.FAMILY},
		{id: 2, name: categoryLabels.FRIENDS, value: CATEGORY_STATUS.FRIENDS},
		{id:3, name: categoryLabels.COLLEAGUES, value: CATEGORY_STATUS.COLLEAGUES},
		{id: 4, name: categoryLabels.OTHER, value: CATEGORY_STATUS.OTHER},
	])

	protected tables = signal<selectTable[]>([])
	protected isCreateTable = signal<boolean>(false)

	protected isFormInvalid = computed(() => {
		return !this.firstName().trim() || !this.lastName().trim() || isEmailInvalid(this.email()) || !this.telephone().trim()
	})

	protected guestCreated = signal<guestCreatingState>('creating')
	protected creatingGuestMessage = signal<string>('')
	protected assigningTable = signal<tableAssigning>('none')
	protected assigningTableMessage = signal<string>('')

	protected submitting = signal<boolean>(false)
	protected submit = signal<addGuestState>('none')
	protected submittingMessage = signal<string>('')
	protected submittingError = signal<boolean>(false)
	protected errorContent = signal<IExceptions>(<IExceptions>{})

	initialAvatar = computed(() => {
		if (this.firstName() && this.lastName()){
			return this.firstName()[0].toUpperCase()+ this.lastName()[0].toUpperCase()
		} else if(this.firstName() && !this.lastName()){
			return this.firstName()[0].toUpperCase()
		} else if(!this.firstName() && this.lastName()) {
			return this.lastName()[0].toUpperCase()
		}
		else {
			return ''
		}
	})

	ngOnInit(): void {
		this.loadTable()
	}

	loadTable(): void {
		this.tableService.getTableSpace(this.eventUuid)
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


	submitGuest(): void {
		
		if(this.isFormInvalid() || this.submitting()) return

		this.submitting.set(true)
		this.submit.set('submit')
		this.submittingError.set(false)
		this.guestCreated.set('creating')
		this.submittingMessage.set('Création de l\'invité(e) ...')
		this.creatingGuestMessage.set('Création de l\'invité(e) ...')
		this.isCreateTable.set(false)

		const guestPayload: IGuestRequest = {
			firstName: this.firstName().trim(),
			lastName: this.lastName().trim(),
			email: this.email(),
			telephone: normalizeTelephone(this.telephone().trim()),
			category: this.category()
		}

		this.guestService.createGuest(guestPayload, this.eventUuid)
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe({
				next: (res) => {

					this.submittingMessage.set('Invité(e) ajouté(e)')
					this.creatingGuestMessage.set('Invité(e) ajouté(e)')
					this.guestCreated.set('created')
					
					setTimeout(() => {
						this.firstName.set('')
						this.lastName.set('')
						this.email.set('')
						this.telephone.set('')
					}, 300)

					if (this.table().tableName){
						setTimeout(() => {
							this.isCreateTable.set(true)
							this.submittingMessage.set('Assignation de table à l\'invité(e) ...')
							this.assigningTable.set('assigning')
							this.assigningTableMessage.set('Assignation de table à l\'invité(e) ...')

							const guestAssignPayload: IAssignTableGuest = {
								tableName: this.table().tableName,
								guestUuid: res.uuid
							}
	
							this.tableService.assignGuestTable(guestAssignPayload, this.eventUuid, this.table().uuid)
								.pipe(takeUntilDestroyed(this.destroyRef))
								.subscribe({
									next: () => {
										this.submittingMessage.set('Assignation de la table réussie.')
										this.assigningTable.set('assigned')
										this.assigningTableMessage.set('Table assigné à l\'intivité(e)')
										setTimeout(() => {
											this.submitting.set(false)
										}, 1000)
									},
									error: (err) =>{
										this.submittingError.set(true)
										this.submitting.set(false)
										this.assigningTable.set('error')
										this.assigningTableMessage.set('Echec d\'assignation de table à l\'invité(e)')
										const errorContent: IExceptions = {
											error: {message: err.status === 500 ? 'Une erreur est survenue, veillez réessayez plus tard !' : err.error.message},
											name: err.name,
											status: err.status,
										}
										this.errorContent.set(errorContent)
										console.log('assignation table error : ', err)
									}
								})
						}, 500)
					}else{
						this.submitting.set(false)
					}
				},
				error: (err) => {
					this.submitting.set(false)
					this.submittingError.set(true)
					this.guestCreated.set('error')
					this.creatingGuestMessage.set('Echec d\'ajout de l\'invité(e)')

					const errorContent: IExceptions = {
						error: {message: err.status === 500 ? 'Une erreur est survenue, veillez réessayez plus tard !' : err.error.message},
						name: err.name,
						status: err.status,
					}
					this.errorContent.set(errorContent)
				}
			})
	}

	createGuestStateIcon(): string{
		switch(this.guestCreated()){
			case 'creating':
				return 'pi pi-spinner-dotted'
			case 'created':
				return 'pi pi-check'
			case 'error':
				return 'pi pi-times'
			default:
				return 'pi pi-spinner-dotted'
		}
	}

	assignTableStateIcon(): string{
		switch(this.assigningTable()){
			case 'assigning':
				return 'pi pi-spinner-dotted'
			case 'assigned':
				return 'pi pi-check'
			case 'error':
				return 'pi pi-times'
			default:
				return 'pi pi-spinner-dotted'
		}
	}

	goBack(): void {
		if(window.history.length > 1){
			this.location.back()
		} else {
			this.router.navigate(['/'])
		}
	}
}
