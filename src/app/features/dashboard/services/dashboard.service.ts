import { effect, Injectable, signal } from '@angular/core';
import { IEventResponse } from '../../event/interface/event.interface';

@Injectable({
  	providedIn: 'root',
})
export class DashboardService {
	
	eventStorage = localStorage.getItem('eventStorage')

	public readonly getEventStorage$ = signal<IEventResponse | null>(this.eventStorage ? JSON.parse(this.eventStorage) : null)

	// constructor() {
	// 	effect(() => {
	// 		const eventLocal = localStorage.getItem('eventStorage')

	// 	})
	// }
}
