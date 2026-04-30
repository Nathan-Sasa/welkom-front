import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { withInMemoryScrolling } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

import { routes } from './app.routes';

registerLocaleData(localeFr);

export const appConfig: ApplicationConfig = {
	providers: [
		provideBrowserGlobalErrorListeners(),
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(
			routes,
			withInMemoryScrolling({
				scrollPositionRestoration: 'top',
				anchorScrolling: 'enabled',
			}),
		),
		provideHttpClient(),
		provideAnimationsAsync(),
		providePrimeNG({
            theme: {
                preset: Aura
            }
        }),
		{ provide: LOCALE_ID, useValue: 'fr-FR' },
	]
};
