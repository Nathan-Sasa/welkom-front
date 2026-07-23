import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';
import { IUser } from '../interfaces/user.interface';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, distinctUntilChanged, map, Observable, of, tap } from 'rxjs';

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

	private readonly loginApiUrl = environment.apisUrl.loginApiUrl
	private readonly registerApiUrl = environment.apisUrl.registerApiUrl
	private readonly currentUserApiUrl = environment.apisUrl.currentUserApiUrl
	private readonly logoutApiUrl = environment.apisUrl.logoutApiUrl

	// private _currentUser$ = new BehaviorSubject<IUser | null>(null)
	// public currentUser$ = this._currentUser$.asObservable().pipe(distinctUntilChanged())

	// private _isAuthenticated$ = new BehaviorSubject<boolean | null>(null)
	// public isAuthenticated$ = this._isAuthenticated$.asObservable().pipe(distinctUntilChanged())

	public readonly currentUser = signal<IUser | null>(null)
	public readonly isAuthenticated = computed<boolean>(() => this.currentUser() !== null)
	public readonly isSuperAdmin = computed<boolean>(() => this.currentUser()?.role === 'WLK_SUPER_ADMIN')
	public readonly isAdmin = computed<boolean>(() => this.currentUser()?.role === 'WLK_ADMIN')
	public readonly isSuperUser = computed<boolean>(() => this.currentUser()?.role === 'WLK_SUPER_USER')

	getCurrentUser(): Observable<IUser | null> {
		return this.http.get<IUser>(this.currentUserApiUrl)
			.pipe(
				tap( user => {
					// this._currentUser$.next(user)
					// this._isAuthenticated$.next(true)
					this.currentUser.set(user)
					console.log('Utilisateur connecté : ',this.currentUser())
				}),
				catchError((err) => {
					// this._currentUser$.next(null)
					// this._isAuthenticated$.next(null)
					this.currentUser.set(null)

					console.log('Error current user : ', err)
					return of(null)
				})
			) // zHZXs9t3P6GT
	}

	login(email: string, password: string): Observable<any> {
		return this.http.post<{user: IUser}>(this.loginApiUrl, {email, password}, {withCredentials: true, responseType: 'json' as 'json'})
			.pipe(
				tap( res => {
					// this._currentUser$.next(res.user)
					// this._isAuthenticated$.next(true)
					this.currentUser.set(res.user)
					console.log('Utilisateur connecté : ',this.currentUser())
				})
			)
	}

	register(payload: AuthRequest): Observable<any> {
		return this.http.post<{user: IUser}>(this.registerApiUrl, payload, {withCredentials: true, responseType: 'json' as 'json'})
			.pipe(
				tap( res => {
					// this._currentUser$.next(res.user)
					// this._isAuthenticated$.next(true)
					this.currentUser.set(res.user)
					console.log('Utilisateur Enregistré : ',this.currentUser())
				})
			)
	}

	loginWithGoogle(): void {
		window.location.href = 'http://localhost:8080/oauth2/authorization/google';
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

	// isLoggedIn(): Observable<boolean> {
	// 	return this._currentUser$.asObservable()
	// 		.pipe(
	// 			map(user => user !== null)
	// 		)
	// }

	// getUser(): IUser | null {
	// 	return this._currentUser$.getValue() || null
	// }

	// getRole(): string | null {
	// 	return this._currentUser$.getValue()?.role || null
	// }

	// getIsAuthenticated(): boolean | null {
	// 	return this._isAuthenticated$.value
	// }

	purge(): void {
		// this._currentUser$.next(null)
		// this._isAuthenticated$.next(null)
		this.currentUser.set(null)
		this.router.navigate(['/login'])
	}

}
