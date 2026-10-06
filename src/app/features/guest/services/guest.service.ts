import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { environment } from '../../../../environments/environment';
import { delay, Observable } from 'rxjs';
import { IGuest } from '../interfaces/guest.interface';
import { Pagination } from '../../../core/interfaces/pagination.interface';

@Injectable({
  	providedIn: 'root',
})
export class GuestService {
	private readonly http = inject(HttpClient)
	private readonly guestApi = environment.apisUrl.guestUrl.prefix

	getGuestsByEvent(
		eventUuid: string, 
		page: number = 0, 
		size: number = 20, 
		search: string, 
		category:string
		): Observable<Pagination<IGuest>>{

		let params = new HttpParams().set('page', page)
		params = params.append('size', size)

		if (search){
			params = params.append('search', search)
		}

		if(category){
			params = params.append('category', category)
		}

		return this.http.get<Pagination<IGuest>>(`${this.guestApi}/${eventUuid}/guests`, {params}).pipe(delay(500))
	}
}
