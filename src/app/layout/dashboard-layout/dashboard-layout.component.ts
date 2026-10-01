import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { SideMenuComponent } from '../side-menu/side-menu.component';
import { RoleDirective } from '../../shared/directives/role/role.directive';
import { AuthService } from '../../core/auth/services/auth.service';

import { AvatarModule } from 'primeng/avatar';

@Component({
	selector: 'wlk-dashboard-layout',
	imports: [
		RouterOutlet,
		RouterLink,
		SideMenuComponent,
		RoleDirective,
		AvatarModule
	],
	templateUrl: './dashboard-layout.component.html',
	styleUrl: './dashboard-layout.component.css',
})
export class DashboardLayoutComponent {
	
	protected readonly auth = inject(AuthService)

	isMenuCollapsed = false;

	onMenuToggle(collapsed: boolean) {
		this.isMenuCollapsed = collapsed;
	}
}
