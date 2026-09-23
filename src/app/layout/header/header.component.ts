import { Component, inject } from '@angular/core';
import { AppInfo } from '../../shared/utils/meta-data';
import { RouterModule } from '@angular/router';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { ThemeComponent } from '../../shared/theme/theme.component';
import { WelkomLogoComponent } from '../../shared/components/welko-logo/welkom-logo.component';
import { RoleDirective } from '../../shared/directives/role/role.directive';
import { AuthService } from '../../core/auth/services/auth.service';
import { Button } from 'primeng/button'

@Component({
	selector: 'wlk-header',
	imports: [
		RouterModule,
		RoleDirective,
		DrawerModule, 
		ButtonModule,
		ThemeComponent,
		WelkomLogoComponent,
		Button
	],
	templateUrl: './header.component.html',
	styleUrl: './header.component.css',
})
export class HeaderComponent {

	protected readonly auth = inject(AuthService)

	appInfo = {
		name: AppInfo.name,
		logo: AppInfo.logo
	}

	protected routePath: string = ''

	protected isMenuOpen: boolean = false

	constructor(){
		
	}
}
