import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection, LOCALE_ID, inject, provideAppInitializer } from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

import { JwtInterceptor } from './core/interceptors/jwt.interceptor';
import { AuthService } from './core/auth/services/auth.service';
// import { IUser } from './core/auth/interfaces/user.interface';
import { catchError, firstValueFrom, of } from 'rxjs';

import { MessageService } from 'primeng/api'
import { providePrimeNG } from 'primeng/config';
import { WelkomPreset } from './core/theme/welkom-preset';

registerLocaleData(localeFr);

// function initializeApp(): () => Promise<IUser | null> {
// 	const auth = inject(AuthService)
	
// 	return () => firstValueFrom(
// 		auth.getCurrentUser().pipe(
// 			catchError(() => of(null))
// 		)
// 	)
// }

// function initializeApp(authService = inject(AuthService)): () => Promise<IUser | null> {
//   return () => firstValueFrom(
// 		authService.getCurrentUser().pipe(
// 			catchError(() => of(null)) 
// 		)
//   );
// }

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
			withComponentInputBinding()
		),
		provideHttpClient(
			withInterceptors([
				JwtInterceptor
			])
		),
		provideAppInitializer(() => {
			const auth = inject(AuthService)
			return firstValueFrom(
				auth.getCurrentUser().pipe(
					catchError(() => of(null))
				)
			)
		}),
		provideAnimationsAsync(),
		providePrimeNG({
            theme: {
                preset: WelkomPreset,
				options: {
					darkModeSelector: '.dark',
					cssLayer: false
				}
            },
        }),
		{ provide: LOCALE_ID, useValue: 'fr-FR' },
		MessageService
	]
};
