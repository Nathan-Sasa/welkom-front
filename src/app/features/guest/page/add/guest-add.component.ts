import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DashboardService } from '../../../dashboard/services/dashboard.service';
import { GuestService } from '../../services/guest.service';

import { InputText } from 'primeng/inputtext';
import { InputIcon } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';
import { Select } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { TableService } from '../../../table/service/table.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Location } from '@angular/common';
import { Router } from '@angular/router';


@Component({
	selector: 'wlk-guest-add',
	imports: [
		ButtonModule
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
	category = signal<string>('')

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
