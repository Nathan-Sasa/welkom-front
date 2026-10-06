import { Component, computed, inject, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AppInfo } from '../../shared/utils/meta-data';
import { EntryAnimDirective } from '../../shared/directives/entry-anim.directive';
import { DashboardService } from '../../features/dashboard/services/dashboard.service';

@Component({
	selector: 'wlk-side-menu',
	imports: [
		RouterLink,
		RouterLinkActive,
		EntryAnimDirective
	],
	templateUrl: './side-menu.component.html',
	styleUrl: './side-menu.component.css',
})
export class SideMenuComponent {

	appLogo = AppInfo.logo
	eventUuid = inject(DashboardService).getEventStorage$()?.uuid

	isCollapsed = computed<boolean>(() => {
		return this.toggle()
	});

	// toggle = output<boolean>();
	toggle = input.required<boolean>()

	menuItems = [
		{ route: `/dashboard/${this.eventUuid}`, icon: 'pi pi-objects-column text-label', label: 'Dashboard' },
		{ route: `/guest/${this.eventUuid}`, icon: 'pi pi-user', label: 'Invités' },
		{ route: '/catalogues', icon: 'pi pi-folder', label: 'Catalogues' },
	];

	// getToggle = computed<boolean>(() => {
	// 	return this.toggle()
	// })

	// toggleMenu() {
	// 	this.isCollapsed = !this.isCollapsed;
	// 	// this.toggle.emit(this.isCollapsed);
	// }
}
