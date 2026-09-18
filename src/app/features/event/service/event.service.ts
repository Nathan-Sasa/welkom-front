import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { Observable } from 'rxjs';
import { IEvent } from '../interface/event.interface';

@Injectable({
  	providedIn: 'root',
})
export class EventService {

	private readonly http = inject(HttpClient)

	private readonly createApi = environment.apisUrl.eventUrl.create



	create(payload: IEvent): Observable<any>{
		return this.http.post<any>(this.createApi, payload)
	}
}
