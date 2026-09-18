import { inject, Injectable, ResourceRef, Signal } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { HttpClient, httpResource } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICatalogue } from '../interfaces/catalogue.interface';
import { Page } from '../../../core/interfaces/pagination.interface';

@Injectable({
  	providedIn: 'root',
})
export class CatalogueService {
	
	private readonly http = inject(HttpClient)

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

	create(payload: ICatalogue): Observable<ICatalogue> {
		return this.http.post<ICatalogue>(this.createApi, payload)
	}
}
