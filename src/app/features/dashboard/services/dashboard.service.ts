import { effect, inject, Injectable, signal } from '@angular/core';
import { IEventResponse } from '../../event/interface/event.interface';
import { Observable } from 'rxjs';
import { IDashboard } from '../interface/dashboard.interfaces';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  	providedIn: 'root',
})
export class DashboardService {

    private readonly http = inject(HttpClient)
    private readonly dashboardApi = environment.apisUrl.dashboardUrl.dashboard
	
	private storageKey = 'eventStorage'
	private eventStorage = localStorage.getItem(this.storageKey)
	// public readonly getEventStorage$ = signal<IEventResponse | null>(this.eventStorage ? JSON.parse(this.eventStorage) : null)

	setEventStorage(event: IEventResponse): void {
        // localStorage.setItem(this.storageKey, eventUuid)
        localStorage.setItem(this.storageKey, JSON.stringify(event))
    }

    getEventStorage$(): IEventResponse | null {
        return this.eventStorage ? JSON.parse(this.eventStorage) : null
    }

    clearEventStorage(): void {
        localStorage.removeItem(this.storageKey)
    }




    // request http 

    getDashboardData(eventUuid: string): Observable<IDashboard>{
        return this.http.get<IDashboard>(`${this.dashboardApi}/${eventUuid}/dashboard`)
    }
}
