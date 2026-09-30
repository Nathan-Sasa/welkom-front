import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { IUser } from '../interfaces/user.interface';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { ROLES } from '../interfaces/role.interface';
import { IEventResponse } from '../../../features/event/interface/event.interface';
import { DashboardService } from '../../../features/dashboard/services/dashboard.service';

interface AuthRequest {
	email: string,
	username: string
	password: string
}

@Injectable({
  	providedIn: 'root',
})
export class AuthService {

	private readonly http = inject(HttpClient)
	private readonly router = inject(Router)
	private readonly dashboard = inject(DashboardService)

	private readonly oauthApiUrl = environment.apisUrl.auth.oauthApi
	private readonly loginApiUrl = environment.apisUrl.auth.loginApiUrl
	private readonly registerApiUrl = environment.apisUrl.auth.registerApiUrl
	private readonly currentUserApiUrl = environment.apisUrl.auth.currentUserApiUrl
	private readonly logoutApiUrl = environment.apisUrl.auth.logoutApiUrl


	public readonly currentUser = signal<IUser | null>(null)
	public readonly isAuthenticated = computed<boolean>(() => this.currentUser() !== null)
	public readonly isUser = computed<boolean>(() => this.currentUser()?.role === 'WLK_USER')
	public readonly isAdmin = computed<boolean>(() => this.currentUser()?.role === 'WLK_ADMIN')
	public readonly isSuperAdmin = computed<boolean>(() => this.currentUser()?.role === 'WLK_SUPER_ADMIN')

	

	getCurrentUser(): Observable<IUser | null> {
		return this.http.get<IUser>(this.currentUserApiUrl)
			.pipe(
				tap( user => {
					this.currentUser.set(user)
					// console.log('Utilisateur connecté : ',this.currentUser())
				}),
				catchError((err) => {
					this.currentUser.set(null)
					console.log('Error current user : ', err)
					return of(null)
				})
			)
	}

	login(email: string, password: string): Observable<IUser> {
		return this.http.post<IUser>(this.loginApiUrl, {email, password}, {withCredentials: true, responseType: 'json' as 'json'})
			.pipe(
				tap((user) => {
					this.currentUser.set(user)
					if (user.role === ROLES.ADMIN){}

					if (user.role === ROLES.USER){
						this.dashboard.getEventStorage$() 
						?  void this.router.navigate(['/dashboard', this.dashboard.getEventStorage$()?.uuid])
						: void this.router.navigate(['/profile'])
					}
				})
			)
	}

	register(payload: AuthRequest): Observable<IUser> {
		return this.http.post<IUser>(this.registerApiUrl, payload, {withCredentials: true, responseType: 'json' as 'json'})
			.pipe(
				tap((user) => {
					this.currentUser.set(user)
					console.log('Utilisateur Enregistré : ',this.currentUser())
				})
			)
	}

	loginWithGoogle(): void {
		window.location.href = this.oauthApiUrl;
	}

	logoutUser(): Observable<void | null> {
		return this.http.post<void>(this.logoutApiUrl, {}, {withCredentials: true})
			.pipe(
				tap( res => {
					console.log('Utilisateur déconnecté !')
					this.purge()
				}),
				catchError((err) => {
					console.log('Erreur de déconnexion... : ', err)
					return of(null)
				})
			)
	}

	purge(): void {
		this.currentUser.set(null)
		this.dashboard.clearEventStorage()
		this.router.navigate(['/login'])
	}

}
