import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { SideMenuComponent } from '../side-menu/side-menu.component';
import { RoleDirective } from '../../shared/directives/role/role.directive';
import { AuthService } from '../../core/auth/services/auth.service';

import { AvatarModule } from 'primeng/avatar';
import { ThemeComponent } from '../../shared/theme/theme.component';

@Component({
	selector: 'wlk-dashboard-layout',
	imports: [
		RouterOutlet,
		RouterLink,
		SideMenuComponent,
		RoleDirective,
		AvatarModule,
		ThemeComponent
	],
	templateUrl: './dashboard-layout.component.html',
	styleUrl: './dashboard-layout.component.css',
})
export class DashboardLayoutComponent {
	
	protected readonly auth = inject(AuthService)

	isMenuCollapsed = false;
	isCollapsed = signal<boolean>(false);

	// onMenuToggle(collapsed: boolean) {
	// 	this.isMenuCollapsed = collapsed;
	// }

	toggleMenu() {
		this.isCollapsed.update(v => !v);
		this.isMenuCollapsed = this.isCollapsed()
	}
}
