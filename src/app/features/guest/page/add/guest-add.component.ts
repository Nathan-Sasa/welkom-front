import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardService } from '../../../dashboard/services/dashboard.service';
import { GuestService } from '../../services/guest.service';
import { TableService } from '../../../table/service/table.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { Avatar } from 'primeng/avatar'
import { InputText } from 'primeng/inputtext';
import { InputIcon } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';
import { Select } from 'primeng/select';
import { CategoriesType, CATEGORY_STATUS, categoryLabels, guestCategories } from '../../../../core/types/category.type';


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
		Select
	],
	templateUrl: './guest-add.component.html',
	styleUrl: './guest-add.component.css',
})
export class GuestAddComponent implements OnInit {

	private readonly location = inject(Location)
	private readonly router = inject(Router)
	private readonly destroyRef = inject(DestroyRef)
	// private readonly eventUuid = inject(DashboardService).getEventStorage$()?.uuid
	private readonly guestService = inject(GuestService)
	private readonly tableService = inject(TableService)

	firstName = signal<string>('')
	lastName = signal<string>('')
	email = signal<string>('')
	telephone = signal<string>('')
	category = signal<CategoriesType>('FAMILY')
	table = signal('')

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

	categories = signal<guestCategories[]>([
		{id: 1, name: categoryLabels.FAMILY, value: CATEGORY_STATUS.FAMILY},
		{id: 2, name: categoryLabels.FRIENDS, value: CATEGORY_STATUS.FRIENDS},
		{id:3, name: categoryLabels.COLLEAGUES, value: CATEGORY_STATUS.COLLEAGUES},
		{id: 4, name: categoryLabels.OTHER, value: CATEGORY_STATUS.OTHER},
	])

	protected tables = signal<string[]>([])

	ngOnInit(): void {
		this.loadTable()
	}

	loadTable(): void {
		this.tableService.getTablesName()
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe({
				next: (tables) => {
					this.tables.set(tables.map(t => t.tableName))
					console.log('table response : ', this.tables())
				},
				error: (err) => {
					console.log('table error : ', err)
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
}
