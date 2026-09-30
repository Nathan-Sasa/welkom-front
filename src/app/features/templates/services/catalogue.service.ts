import { inject, Injectable, ResourceRef, Signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, httpResource } from '@angular/common/http';
import { delay, Observable } from 'rxjs';
import { ICatalogue, ICatalogueResponse, ICustomCatalogue, ICustomCatalogueResponse } from '../interfaces/catalogue.interface';
import { Pagination } from '../../../core/interfaces/pagination.interface';

@Injectable({
  	providedIn: 'root',
})
export class CatalogueService {
	
	private readonly http = inject(HttpClient)

	private readonly templateApi = environment.apisUrl.templateUrl.prefix
	private readonly listApi = environment.apisUrl.templateUrl.list
	private readonly createApi =environment.apisUrl.templateUrl.create
	private readonly customApi = environment.apisUrl.catalogueUrl.customize

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

	customCatalogueEvent(eventUuid: string, custom: ICustomCatalogue ): Observable <ICustomCatalogueResponse>{
		return this.http.post<ICustomCatalogueResponse>(`${this.customApi}/${eventUuid}/customized-template`, custom)
	}

	create(payload: ICatalogue): Observable<ICatalogueResponse> {
		return this.http.post<ICatalogueResponse>(this.createApi, payload)
	}
}
