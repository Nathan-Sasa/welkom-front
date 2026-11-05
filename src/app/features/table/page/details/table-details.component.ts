import { Component, DestroyRef, effect, inject, input, signal } from '@angular/core';
import { TableService } from '../../service/table.service';
import { EntryAnimDirective } from '../../../../shared/directives/entry-anim.directive';
import { DashboardService } from '../../../dashboard/services/dashboard.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ITableResponse } from '../../interface/table.interfaces';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { TabsModule } from 'primeng/tabs'
import { ButtonModule } from 'primeng/button';

@Component({
	selector: 'wlk-table-details',
	imports: [
		EntryAnimDirective,
		TabsModule,
		ButtonModule
	],
	templateUrl: './table-details.component.html',
	styleUrl: './table-details.component.css',
})
export class TableDetailsComponent {
	
	private readonly destroyRef = inject(DestroyRef)
	private readonly location = inject(Location)
	private readonly router = inject(Router)
	private readonly tableService = inject(TableService)
	private readonly eventUuid = inject(DashboardService).getEventStorage$()?.uuid

	tableUuid = input<string>()

	table = signal<ITableResponse>(<ITableResponse>{})

	protected loading = signal<boolean>(true)

	constructor(){
		effect(() => {
			const tableUuid = this.tableUuid()

			if(tableUuid && this.eventUuid){
				this.tableService.getTableByUuid(this.eventUuid, tableUuid)
					.pipe(takeUntilDestroyed(this.destroyRef))
					.subscribe({
						next: (table) => {
							this.table.set(table)
							this.loading.set(false)
							// console.log('get table : ', table)
						},
						error: (err) => {
							this.loading.set(false)
							console.log('get table error : ', err)
						}
					})
			}
		})
	}

	goBack(): void {
		if (window.history.length > 1){
			this.location.back()
		} else {
			void this.router.navigate(['/'])
		}
	}
}
