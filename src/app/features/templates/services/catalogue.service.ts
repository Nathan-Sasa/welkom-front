import { inject, Injectable, ResourceRef, Signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, httpResource } from '@angular/common/http';
import { delay, Observable } from 'rxjs';
import { ICatalogue, ICatalogueResponse } from '../interfaces/catalogue.interface';
import { Pagination } from '../../../core/interfaces/pagination.interface';

@Injectable({
  	providedIn: 'root',
})
export class CatalogueService {
	
	private readonly http = inject(HttpClient)

	private readonly templateApi = environment.apisUrl.templateUrl.prefix
	private readonly listApi = environment.apisUrl.templateUrl.list
	private readonly createApi =environment.apisUrl.templateUrl.create

	getAll(): Observable <any>{
		return this.http.get<any>(this.listApi)
	}

	// public getCatalogueListRessource(
	// 	page: Signal<number>,
	// 	limit: number,
	// 	search: Signal<string>,
	// 	pendingSearch: Signal<string>,
	// ): ResourceRef<Page<ICatalogue> | undefined>{
	// 	return httpResource<Page<ICatalogue>>(() => {
	// 		if (pendingSearch().trim() !== search().trim()) {
	// 			throw ResourcePa
	// 		}
	// 	})
	// }

	getByUuid(uuid: string): Observable<ICatalogueResponse>{
		return this.http.get<ICatalogueResponse>(`${this.templateApi}/${uuid}`).pipe(delay(500))
	}

	create(payload: ICatalogue): Observable<ICatalogueResponse> {
		return this.http.post<ICatalogueResponse>(this.createApi, payload)
	}
}
