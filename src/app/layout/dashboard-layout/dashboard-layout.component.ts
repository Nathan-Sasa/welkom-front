import { Component, EventEmitter, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { SideMenuComponent } from '../side-menu/side-menu.component';
import { RoleDirective } from '../../shared/directives/role/role.directive';
import { AuthService } from '../../core/auth/services/auth.service';

import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { ThemeComponent } from '../../shared/theme/theme.component';
import { DashboardService } from '../../features/dashboard/services/dashboard.service';

@Component({
	selector: 'wlk-dashboard-layout',
	imports: [
		RouterOutlet,
		RouterLink,
		RouterLinkActive,
		SideMenuComponent,
		RoleDirective,
		AvatarModule,
		ButtonModule,
		DrawerModule,
		ThemeComponent
	],
	templateUrl: './dashboard-layout.component.html',
	styleUrl: './dashboard-layout.component.css',
})
export class DashboardLayoutComponent {
	
	protected readonly auth = inject(AuthService)
	private readonly eventUuid = inject(DashboardService).getEventStorage$()?.uuid

	isMenuCollapsed = false;
	isCollapsed = signal<boolean>(false);

	isMenuDrawer = false

	toggleMenu() {
		this.isCollapsed.update(v => !v);
		this.isMenuCollapsed = this.isCollapsed()
	}

	menuItems = [
		{ route: `/dashboard/${this.eventUuid}`, icon: 'pi pi-objects-column text-label', label: 'Dashboard' },
		{ route: `/guest/${this.eventUuid}`, icon: 'pi pi-user', label: 'Invités' },
		{ route: '/catalogues', icon: 'pi pi-folder', label: 'Catalogues' },
	];
}
