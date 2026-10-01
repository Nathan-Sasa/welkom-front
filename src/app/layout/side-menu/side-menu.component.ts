import { Component, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
	selector: 'wlk-side-menu',
	imports: [
		RouterLink,
		RouterLinkActive
	],
	templateUrl: './side-menu.component.html',
	styleUrl: './side-menu.component.css',
})
export class SideMenuComponent {

	isCollapsed = false;

	toggle = output<boolean>();

	menuItems = [
		{ route: '/dashboard', icon: 'pi pi-objects-column text-label', label: 'Dashboard' },
		{ route: '/catalogues', icon: 'pi pi-folder', label: 'Catalogues' },
		{ route: '/profile', icon: 'pi pi-user', label: 'Profile' }
	];

	toggleMenu() {
		this.isCollapsed = !this.isCollapsed;
		this.toggle.emit(this.isCollapsed);
	}
}
