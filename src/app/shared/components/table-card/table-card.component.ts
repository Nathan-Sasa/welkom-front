import { Component, input } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ITableDashboard } from '../../../features/dashboard/interface/dashboard.interfaces';

@Component({
    selector: 'wlk-table-card',
    imports: [
		AvatarModule
	],
    templateUrl: './table-card.component.html',
    styleUrl: './table-card.component.css',
})
export class TableCardComponent {
	table = input.required<ITableDashboard>()
}
