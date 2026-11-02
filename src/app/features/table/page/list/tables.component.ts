import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IExceptions } from '../../../../core/interfaces/exception.interface';
import { TableService } from '../../service/table.service';
import { Router } from '@angular/router';
import { ITableResponse, ITableRequest } from '../../interface/table.interfaces';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ErrorsComponent } from '../../../../shared/components/errors/errors.component';

import { ButtonModule } from 'primeng/button'
import { Dialog } from 'primeng/dialog'
import { InputText } from 'primeng/inputtext'
import { Divider } from 'primeng/divider'
import { AccordionModule } from 'primeng/accordion';
import { Avatar } from 'primeng/avatar';
import { TagModule } from 'primeng/tag'
import { TableSkeletonListComponent } from '../../components/table-skeleton-list/table-skeleton-list.component';
import { EntryAnimDirective } from '../../../../shared/directives/entry-anim.directive';

@Component({
	selector: 'wlk-tables',
	imports: [
		FormsModule,
		ButtonModule,
		Dialog,
		InputText,
		ErrorsComponent,
		Divider,
		AccordionModule,
		Avatar,
		TagModule,
		TableSkeletonListComponent,
		EntryAnimDirective
	],
	templateUrl: './tables.component.html',
	styleUrl: './tables.component.css',
})
export class TablesComponent implements OnInit {

	destroyRef = inject(DestroyRef)
	tableService = inject(TableService)
	router = inject(Router)

	protected tables = signal<ITableResponse[]>([])
	protected loadingTables = signal<boolean>(true)
	protected errorReceiveTables = signal<boolean>(false)
	protected errorReceiveTablesContent = signal<IExceptions>(<IExceptions>{})


	// ====================================================
	// Crete table 
	// ====================================================
	
	hasTableDialog: boolean = false
	headerText: string = 'Ajouter une nouvelle table'
	buttonInitialText = 'Ajouter la table'

	protected tableCreatedResponse = signal<ITableResponse>(<ITableResponse>{})

	tableNameField = signal<string>('')
	maxSeatField = signal<number>(1)

	protected isFormInvalid = computed(() => {
		return !this.tableNameField().trim() || this.maxSeatField() < 1
	})

	protected isSubmitting = signal<boolean>(false)
	protected loading = signal<boolean>(false)
	protected error = signal<boolean>(false)
	protected errorContent = signal<IExceptions>(<IExceptions>{})
	protected submittedMessage= signal<string>(this.headerText)
	protected buttonSubmitText = signal<string>(this.buttonInitialText)
	protected created = signal<boolean>(false)

	protected assigningGuest = signal<boolean>(false)

	

	ngOnInit(): void {
		this.loadTables()
	}

	loadTables(): void {
		this.tableService.getTableList()
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe({
				next: (res) => {
					this.tables.set(res)
					console.log('Table list : ', this.tables())
				},
				complete: ()=> {
					this.loadingTables.set(false)
					this.errorReceiveTables.set(false)
					console.log('completed call api')
				},
				error: (err) => {
					this.loadingTables.set(false)
					this.errorReceiveTables.set(true)

					const errorContent: IExceptions = {
						error: {message: err.status === 500 ? 'Une erreur est survenue, veillez réessayez plus tard !' : err.error.message},
						name: err.name,
						status: err.status,
					}

					this.errorReceiveTablesContent.set(errorContent)
					console.log('error table list :', err)
				}
			})
	}

	// create table method

	toggleHasTableDialog(): void {
		this.hasTableDialog = true
	}

	closeAssigningGuest():void {
		this.assigningGuest.set(false)
	}

	submitTable():void {

		if (this.isFormInvalid() || this.isSubmitting()) return

		this.loading.set(true)
		this.isSubmitting.set(true)
		this.error.set(false)
		this.submittedMessage.set('Crétation de la table...')
		this.buttonSubmitText.set('Crétation de la table...')


		const payloadTable: ITableRequest = {
			tableName: this.tableNameField().trim(),
			maxSeats: this.maxSeatField()
		}

		this.tableService.createTable(payloadTable)
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe({
				next: (res) => {
					this.tableCreatedResponse.set(res)
					
					const inTables: ITableResponse[] = [
						{
							id: res.id,
							tableName: res.tableName,
							maxSeats: res.maxSeats,
							countSeats: res.countSeats,
							guest: res.guest
						}
					] 

					this.tables.set([...this.tables(), ...inTables])
				},
				complete: () =>{
					this.loading.set(false)
					this.submittedMessage.set('Table créée avec succès')
					this.buttonSubmitText.set('Créée')
					this.created.set(true)
					this.assigningGuest.set(true)
					
					setTimeout(() =>{
						this.submittedMessage.set(this.headerText)
						this.buttonSubmitText.set(this.buttonInitialText)
						this.isSubmitting.set(false)
						this.created.set(false)
					}, 1500)
				},
				error: (err) => {
					this.error.set(true)
					this.loading.set(false)
					this.submittedMessage.set(this.headerText)
					this.buttonSubmitText.set(this.buttonInitialText)
					this.isSubmitting.set(false)
					this.created.set(false)
					
					const errorContent: IExceptions = {
						error: {message: err.status === 500 ? 'Une erreur est survenue, veillez réessayez plus tard !' : err.error.message},
						name: err.name,
						status: err.status,
					}
					this.errorContent.set(errorContent)

					console.log('create table error : ', err)
				}
			})
	}
}
