import { ChangeDetectionStrategy, Component, inject} from '@angular/core';
import { AppTheme, ThemeAppService } from '../../core/theme/themeApp.service'

@Component({
	selector: 'app-theme',
	imports: [
		
	],
	templateUrl: './theme.component.html',
	styleUrl: './theme.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeComponent {

	themeAppService = inject(ThemeAppService);
	appTheme = AppTheme

	choiceTheme = false;

	// icons = {
	// 	sun: SunDimIcon,
	// 	moon: MoonIcon,
	// 	system: MonitorCog
	// }

}
