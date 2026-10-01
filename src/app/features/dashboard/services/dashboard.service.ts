import { effect, Injectable, signal } from '@angular/core';
import { IEventResponse } from '../../event/interface/event.interface';

@Injectable({
  	providedIn: 'root',
})
export class DashboardService {
	
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
}
