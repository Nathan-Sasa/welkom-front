import { Component, DestroyRef, inject } from '@angular/core';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Button } from 'primeng/button'

@Component({
	selector: 'wlk-hero-section',
	imports: [
    Button
],
	templateUrl: './hero-section.component.html',
	styleUrl: './hero-section.component.css',
})
export class HeroSectionComponent {

	authService = inject(AuthService)
	destroyRef = inject(DestroyRef)

	heroTextContent = {
		title: 'Créez. Invitez. Célébrez.',
		description: 'Bienvenue sur Welkom, l’espace qui simplifie l\’organisation de vos événements. Créez votre événement, personnalisez vos invitations, gérez vos invités et gardez tout au même endroit.'
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
