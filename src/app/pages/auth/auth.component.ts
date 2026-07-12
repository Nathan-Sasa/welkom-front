import { CommonModule, Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms'
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { takeUntilDestroyed} from '@angular/core/rxjs-interop'
import { firstValueFrom } from 'rxjs';

interface IAuthForm {
	email: FormControl,
	password?: FormControl,
	username?: FormControl
}

@Component({
	selector: 'app-auth',
	imports: [
		RouterModule,
		ReactiveFormsModule,
		CommonModule
	],
	templateUrl: './auth.component.html',
	styleUrl: './auth.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent implements OnInit {
	
	private readonly destroyRef = inject(DestroyRef)
	private readonly route = inject(ActivatedRoute)
	private readonly router = inject(Router)
	private readonly authService = inject(AuthService)
	private readonly location = inject(Location)

	protected authForm: FormGroup<IAuthForm>

	protected authType: string = ''
	protected authLogin = signal<boolean>(true)
	protected authRoute: string = '/register'
	protected buttontext = signal<string>('Se connecter')
	protected title: string = ''

	protected isLogged = signal<boolean>(false)
	protected loading = signal<boolean>(false)
	protected isSubmitting = signal<boolean>(false)

	messageError: String | null = null

	constructor (){
		this.authForm = new FormGroup<IAuthForm>({
			email: new FormControl('', {
				validators: [
					Validators.required,
					Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
				],
				nonNullable: true
			}),
			password: new FormControl('', {
				validators: [
					Validators.required,
					Validators.minLength(8),
					// Validators.pattern()
				]
			})
		})
	}

	ngOnInit(): void {
		this.authType = this.route.snapshot.url.at(-1)!.path
		this.authLogin.set(this.authType === 'login' ? true : false)
		this.authRoute = this.authType === 'login' ? '/register' : '/login'
		this.buttontext.set(this.authType === 'login' ? 'Se connecter' : 'S\'inscrire')
		this.title = this.authType === 'login' ? 'S\'inscrire' : 'Se connecter'

		if(this.authType === 'register') {
			this.authForm.addControl(
				'username',
				new FormControl('', {
					validators: [
						Validators.required,
						Validators.minLength(4)
					],
					nonNullable: true
				})
			)
		}
	}

	submitForm(): void {
		if (this.authForm.invalid) {
			this.authForm.markAllAsTouched
			return
		}

		this.isSubmitting.set(true)
		this.loading.set(true)

		console.log('Connexion ...')

		const {email, password} = this.authForm.value

		let observable = 
			this.authType === 'login'
			? this.authService.login(email!, password!)
			: this.authService.register(this.authForm.value as {
				email: string;
				username: string;
				password: string
			})

		observable
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe({
				next: (res) => {
					this.authForm.reset()
					this.loading.set(false)
					firstValueFrom(this.authService.getCurrentUser())
					// this.router.navigate(['/session'])
				},
				error: (err) => {
					this.isSubmitting.set(false)
					this.loading.set(false)
				}
			})
	}

	goBack(): void {
		if(window.history.length > 1){
			this.location.back()
		} else {
			this.router.navigate(['/'])
		}
	}

}
