import { Component, effect, EventEmitter, inject, output, Output } from '@angular/core';
import { AppInfo } from '../../shared/utils/meta-data';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';
import { WelkomLogoComponent } from '../../shared/components/welko-logo/welkom-logo.component';
import { RoleDirective } from '../../shared/directives/role/role.directive';
import { ThemeComponent } from '../../shared/theme/theme.component';

import { DrawerModule } from 'primeng/drawer';
import { AuthService } from '../../core/auth/services/auth.service';
import { ButtonModule } from 'primeng/button';
import { Button } from 'primeng/button'
import { Avatar } from 'primeng/avatar'

@Component({
	selector: 'wlk-header',
	imports: [
		RouterModule,
		RoleDirective,
		DrawerModule, 
		ButtonModule,
		ThemeComponent,
		// WelkomLogoComponent,
		Button,
		Avatar
	],
	templateUrl: './header.component.html',
	styleUrl: './header.component.css',
})
export class HeaderComponent {

	protected readonly auth = inject(AuthService)
	private readonly router = inject(Router)

	HasHeader = output<boolean>()

	appInfo = {
		name: AppInfo.name,
		logo: AppInfo.logo
	}

	protected isMenuOpen: boolean = false

	constructor(){

		this.router.events
			.pipe(
				filter((event): event is NavigationEnd => event instanceof NavigationEnd)
			)
			.subscribe((event: NavigationEnd) => {
				const routesUrl = event.urlAfterRedirects.split('/').filter(String);
      			// console.log('Segments URL actuels : ', routesUrl)

				const routerDenied = ['dashboard', 'profile', 'invite', 'table', 'cadeau']

				const correspond = routesUrl.some(segment => routerDenied.includes(segment))
				this.HasHeader.emit(!correspond)
			})
	}
}
