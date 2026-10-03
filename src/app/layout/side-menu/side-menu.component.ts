import { Component, computed, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AppInfo } from '../../shared/utils/meta-data';
import { EntryAnimDirective } from '../../shared/directives/entry-anim.directive';

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

	isCollapsed = computed<boolean>(() => {
		return this.toggle()
	});

	// toggle = output<boolean>();
	toggle = input.required<boolean>()

	menuItems = [
		{ route: '/dashboard', icon: 'pi pi-objects-column text-label', label: 'Dashboard' },
		{ route: '/catalogues', icon: 'pi pi-folder', label: 'Catalogues' },
		{ route: '/profile', icon: 'pi pi-user', label: 'Profile' }
	];

	// getToggle = computed<boolean>(() => {
	// 	return this.toggle()
	// })

	// toggleMenu() {
	// 	this.isCollapsed = !this.isCollapsed;
	// 	// this.toggle.emit(this.isCollapsed);
	// }
}
