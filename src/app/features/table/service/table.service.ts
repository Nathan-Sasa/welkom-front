import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, effect } from '@angular/core';
import { DashboardService } from '../../dashboard/services/dashboard.service';
import { environment } from '../../../../environments/environment';
import { delay, Observable } from 'rxjs';
import { ITableResponse, ITableName, ITableRequest, IAssignTableGuest } from '../interface/table.interfaces';

@Injectable({
    providedIn: 'root',
})
export class TableService {
  
	private readonly http = inject(HttpClient)
	private readonly getEventUuid = signal<string | undefined>(inject(DashboardService).getEventStorage$()?.uuid)
	private readonly eventUuid = signal<string | undefined>(this.getEventUuid())
	
	private readonly tableApiPrefix = environment.apisUrl.tableUrl.prefix

	constructor(){
		effect(() =>{
			const effectEventUuid = this.getEventUuid()
			this.eventUuid.set(effectEventUuid)
		})
	}


	createTable(payload: ITableRequest, eventUuid: string | undefined): Observable<ITableResponse>{
		return this.http.post<ITableResponse>(`${this.tableApiPrefix}/${eventUuid}/table`, payload)
	}

	getTableList(eventUuid: string | undefined): Observable<ITableResponse[]>{
		// console.log('event by table service : ', this.getEventUuid())
		return this.http.get<ITableResponse[]>(`${this.tableApiPrefix}/${eventUuid}/table`).pipe(delay(500))
	}

	getTablesName(eventUuid: string | undefined): Observable<ITableName[]>{
		return this.http.get<ITableName[]>(`${this.tableApiPrefix}/${eventUuid}/table-name`)
	}

	getTableSpace(eventUuid: string | undefined): Observable<ITableName[]>{
		return this.http.get<ITableName[]>(`${this.tableApiPrefix}/${eventUuid}/table/space`)
	}

	assignGuestTable(payload: IAssignTableGuest,eventUuid: string | undefined, tableUuid: string): Observable <ITableResponse>{
		return this.http.post<ITableResponse>(`${this.tableApiPrefix}/${eventUuid}/table/${tableUuid}`, payload)
	}

}
