import { CommonModule, Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms'
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/auth/services/auth.service';
import { takeUntilDestroyed} from '@angular/core/rxjs-interop'
import { firstValueFrom } from 'rxjs';
import { InputText } from 'primeng/inputtext'
import { ButtonDirective } from 'primeng/button'
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { PasswordModule} from 'primeng/password'
import { AppInfo } from '../../../shared/utils/meta-data';
// import { ToastModule} from 'primeng/toast'
import { MessageModule } from 'primeng/message'
// import { MessageService } from 'primeng/api';
import { IExceptions } from '../../../core/interfaces/exception.interface';

interface IAuthForm {
	email: FormControl,
	password?: FormControl,
	username?: FormControl
}

@Component({
	selector: 'wlk-auth',
	imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    IconFieldModule,
    InputIconModule,
    InputText,
	PasswordModule,
    ButtonDirective,
	MessageModule
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

	appInfo = AppInfo

	protected authForm: FormGroup<IAuthForm>

	protected authType: string = ''
	protected authLogin = signal<boolean>(true)
	protected authRoute: string = '/auth/register'
	protected buttontext = signal<string>('Se connecter')
	protected title: string = ''

	protected isLogged = signal<boolean>(false)
	protected loading = signal<boolean>(false)
	protected isSubmitting = signal<boolean>(false)

	protected isError = signal<boolean>(false)
	protected messageError = signal<IExceptions | null>(null)

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
		this.authRoute = this.authType === 'login' ? '/auth/register' : '/auth/login'
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
					// firstValueFrom(this.authService.getCurrentUser())
					// console.log('login ok : ',	res)
					// console.log('connect success', res)
					// void this.router.navigate(['/profile'])
				},
				error: (err) => {
					this.isSubmitting.set(false)
					this.loading.set(false)
					console.log('erreur : ', err)

					const error = {
						error: {message: err.error.message},
						name: err.name,
						status: err.status,
					}
					this.messageError.set(error)
					setTimeout(() => {
						this.isError.set(true)
					}, 300);

				}
			})
	}

	isInvalid(controlName: string){
		const control = this.authForm.get(controlName)
		return control?.touched && control?.invalid
	}

	// login with google
	RedirectToGoogleLogin(): void {
		this.authService.loginWithGoogle()
	}

	goBack(): void {
		if(window.history.length > 1){
			this.location.back()
		} else {
			this.router.navigate(['/'])
		}
	}

}
