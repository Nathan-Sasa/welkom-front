import { Component, DestroyRef, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
	selector: 'wlk-hero-section',
	imports: [

	],
	templateUrl: './hero-section.component.html',
	styleUrl: './hero-section.component.css',
})
export class HeroSectionComponent {

	authService = inject(AuthService)
	destroyRef = inject(DestroyRef)

	appDescription = {
		title: 'Vos invitations, du premier clic au contrôle du Jour J.',
		description: 'RSVPs numériques, gestion des invités et accès sécurisé par QR code. Simplifiez l\'organisation de vos moments précieux avec une élégance absolue.'
	}

	logoutSession(): void {
		console.log('logoutSession called')
		this.authService.logoutUser()
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe({
				next: (res) => {
					console.log('Logout successful:', res)
				},
				error: (err) => {
					console.error('Logout error:', err)
				}
			})
	}
}
