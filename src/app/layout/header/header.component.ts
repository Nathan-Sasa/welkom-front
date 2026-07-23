import { Component } from '@angular/core';
import { AppInfo } from '../../shared/utils/meta-data';
import { RouterModule } from '@angular/router';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { ThemeComponent } from '../../shared/theme/theme.component';

@Component({
	selector: 'wlk-header',
	imports: [
		RouterModule,
		DrawerModule, 
		ButtonModule,

		ThemeComponent
	],
	templateUrl: './header.component.html',
	styleUrl: './header.component.css',
})
export class HeaderComponent {

	appInfo = {
		name: AppInfo.name,
		logo: AppInfo.logo
	}

	protected isMenuOpen: boolean = false
}
