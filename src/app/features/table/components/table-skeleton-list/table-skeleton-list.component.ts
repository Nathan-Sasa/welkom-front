import { Component, input } from '@angular/core';
import { EntryAnimDirective } from '../../../../shared/directives/entry-anim.directive';
import { AvatarModule } from 'primeng/avatar';

@Component({
	selector: 'wlk-table-skeleton-list',
	imports: [
		EntryAnimDirective,
		AvatarModule
	],
	templateUrl: './table-skeleton-list.component.html',
	styleUrl: './table-skeleton-list.component.css',
})
export class TableSkeletonListComponent {
	nbList = input.required<number[]>()
}
