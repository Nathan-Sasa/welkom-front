import { ChangeDetectionStrategy, Component, effect, inject} from '@angular/core';
import { AppTheme, ThemeAppService } from '../../core/theme/themeApp.service'
import { ButtonModule } from 'primeng/button';

@Component({
	selector: 'wlk-theme',
	imports: [
		ButtonModule
	],
	templateUrl: './theme.component.html',
	styleUrl: './theme.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeComponent {

	themeAppService = inject(ThemeAppService);
	appTheme = AppTheme

	icon: string = 'pi pi-display'
    themeNumber: number = 1

	constructor() {
        effect(() => {
            const currentProvideTheme = this.themeAppService.themeDisplay()
            switch(currentProvideTheme){
                case this.appTheme.Light:
                    this.toggleTheme('Light')
                    break
                case this.appTheme.Dark:
                    this.toggleTheme('Dark')
                    break
                case this.appTheme.System:
                    this.toggleTheme('System')
                    break
                }
        })
    }

	toggleTheme(mode: string) {
        switch(mode){
            case 'Light':
                this.themeAppService.setLightTheme()
                this.themeNumber = 2
                this.icon = 'pi pi-moon'
                break
            case 'Dark':
                this.themeAppService.setDarkTheme()
                this.themeNumber = 3
                this.icon = 'pi pi-desktop'
                break
            case 'System':
                this.themeAppService.setSystemTheme()
                this.themeNumber = 1
                this.icon = 'pi pi-sun'
                break
            default :
                this.themeAppService.setSystemTheme()
                this.themeNumber = 1
                this.icon = 'pi pi-sun'
                break
        }
    }

	changeMode(){
        switch(this.themeNumber){
            case 1:
                this.toggleTheme('Light')
                break
            case 2:
                this.toggleTheme('Dark')
                break
            case 3:
                this.toggleTheme('System')
                break  
        }
    }

}
