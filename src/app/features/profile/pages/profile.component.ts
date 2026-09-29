import { Component, computed, OnInit, DestroyRef, inject, signal, input } from '@angular/core';
import { AuthService } from '../../../core/auth/services/auth.service';
import { AppInfo } from '../../../shared/utils/meta-data';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { tap } from 'rxjs'
import { RoleDirective } from '../../../shared/directives/role/role.directive';
import { EventCardComponent } from '../../../shared/components/event-card/event-card.component';

import { MessageService } from 'primeng/api'
import { Card } from 'primeng/card'
import { Avatar } from 'primeng/avatar'
import { Button } from 'primeng/button'
import { Divider } from 'primeng/divider'
import { Toast } from 'primeng/toast'
import { InputText } from 'primeng/inputtext'
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { EventService } from '../../event/service/event.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner'

@Component({
    selector: 'wlk-profile',
    imports: [
		FormsModule,
		Card,
		Avatar,
		Button,
		Divider,
		Toast,
		InputText,
		IconFieldModule,
		InputIconModule,
		ProgressSpinnerModule,
		EventCardComponent,
		RouterLink,
		RoleDirective
	],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css',
	providers: [MessageService]
})
export class ProfileComponent implements OnInit {

	private readonly destroyRef = inject(DestroyRef)
	private readonly auth = inject(AuthService)
	private readonly router = inject(Router)
	private readonly event = inject(EventService)

	protected readonly role = input<string | null>()

	protected readonly appInfo = AppInfo
	protected readonly user = this.auth.currentUser

	protected readonly updateMode = signal<boolean>(false)
	firstName = signal<string>(this.user()?.first_name || '')
	fieldsInvalid = computed(() => {
		return !this.firstName().trim() || this.firstName().trim().length < 2 || this.firstName().trim() === this.user()?.first_name
	})

	eventLoading = signal<boolean>(true)
	eventsLabel = toSignal(this.event.list(0, 3).pipe(tap((event) => {this.eventLoading.set(false); console.log('eventLabel : ', event)})))

	constructor(private readonly messageService: MessageService) {}

	ngOnInit(): void {
		console.log('ProfileComponent initialized with role: ', this.role())
	}

	updateModeHandle():void {
		this.updateMode.update((v) => !v)
	}

	logout(): void {
		this.auth.logoutUser()
		.pipe(takeUntilDestroyed(this.destroyRef))
		.subscribe({
			next: (res) => {
				// console.log('logout ok : ',	res)
				this.auth.currentUser.set(null)
				void this.router.navigate(['/auth/login'])
			},
			error: (err) => {
				this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Une erreur est survenue lors de la déconnexion. Veuillez réessayer.'});
				console.log('logout error : ',	err)
			}
		})
	}

	// 
	// eventsLabel(): void {
	// 	const page: number = 0
	// 	const size: number = 3

	// }
}
