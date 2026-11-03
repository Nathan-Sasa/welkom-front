import { Component, DestroyRef, inject, input } from '@angular/core';
import { TableService } from '../../service/table.service';
import { EntryAnimDirective } from '../../../../shared/directives/entry-anim.directive';

import { TabsModule } from 'primeng/tabs'

@Component({
	selector: 'wlk-table-details',
	imports: [
		EntryAnimDirective,
		TabsModule
	],
	templateUrl: './table-details.component.html',
	styleUrl: './table-details.component.css',
})
export class TableDetailsComponent {
	
	private readonly destroyRef = inject(DestroyRef)
	private readonly tableService = inject(TableService)

	tableUuid = input<string>()
}
