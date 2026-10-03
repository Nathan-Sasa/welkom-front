import { effect, inject, Injectable, signal } from '@angular/core';
import { IEventResponse } from '../../event/interface/event.interface';
import { Observable } from 'rxjs';
import { IDashboard } from '../interface/dashboard.interfaces';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { IEventKey } from '../../../core/interfaces/security.interfaces';

@Injectable({
  	providedIn: 'root',
})
export class DashboardService {

    private readonly http = inject(HttpClient)
    private readonly dashboardApi = environment.apisUrl.dashboardUrl.dashboard
    protected readonly eventKeyApi = environment.apisUrl.securityUrl.eventKey
	
	private storageKey = 'eventStorage'
	private eventStorage = signal(localStorage.getItem(this.storageKey))
    readonly getEventStorage$ = signal<IEventResponse | null>( null)

    constructor(){
        effect(() => {
            const storageEvent = this.eventStorage()
            this.getEventStorage$.set(storageEvent ? JSON.parse(storageEvent) : null)
        })
    }


	setEventStorage(event: IEventResponse): void {
        this.getEventStorage$.set(event)
        localStorage.setItem(this.storageKey, JSON.stringify(event))
    }

    // getEventStorage$(): IEventResponse | null {
    //     return this.eventStorage ? JSON.parse(this.eventStorage) : null
    // }

    clearEventStorage(): void {
        this.getEventStorage$.set(null)
        localStorage.removeItem(this.storageKey)
    }




    // request http 

    getDashboardData(eventUuid: string): Observable<IDashboard>{
        return this.http.get<IDashboard>(`${this.dashboardApi}/${eventUuid}/dashboard`)
    }


    getSecurityKey(eventUuid: string): Observable<IEventKey>{
        return this.http.get<IEventKey>(`${this.eventKeyApi}/${eventUuid}/security-key`)
    }

    regenerateEventKey(eventUuid: string): Observable<IEventKey>{
        return this.http.post<IEventKey>(`${this.eventKeyApi}/${eventUuid}/security-key/regenerate`, {})
    }

    //methode test temporaire pour generer une EventKey security-key/regenerat Régénération de la clé de sécurité d'un événement.
    activateEvent(eventUuid: string): Observable<IEventKey>{
        return this.http.post<IEventKey>(`${this.eventKeyApi}/${eventUuid}/activate`, {})
    }

}
