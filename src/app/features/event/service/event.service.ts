import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable, delay } from 'rxjs';
import { IEvent, IEventResponse } from '../interface/event.interface';
import { Pagination } from '../../../core/interfaces/pagination.interface';

@Injectable({
  	providedIn: 'root',
})
export class EventService {

	private readonly http = inject(HttpClient)

	private readonly createApi = environment.apisUrl.eventUrl.create
	private readonly listApi = environment.apisUrl.eventUrl.list

	create(payload: IEvent): Observable<IEventResponse>{
		return this.http.post<IEventResponse>(this.createApi, payload).pipe(delay(800))
	}

	list(page: number = 0, size: number = 10): Observable<Pagination<IEventResponse>>{
		let params = new HttpParams().set('page', page)
		params = params.append('size', size)

		return this.http.get<Pagination<IEventResponse>>(this.listApi, {params}).pipe(delay(3000))
	}
}
