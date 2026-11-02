import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DashboardService } from '../../dashboard/services/dashboard.service';
import { environment } from '../../../../environments/environment';
import { delay, Observable } from 'rxjs';
import { ITableResponse, ITableName, ITableRequest, IAssignTableGuest } from '../interface/table.interfaces';

@Injectable({
    providedIn: 'root',
})
export class TableService {
  
	private readonly http = inject(HttpClient)
	private readonly eventUuid = inject(DashboardService).getEventStorage$()?.uuid
	
	private readonly tableApiPrefix = environment.apisUrl.tableUrl.prefix


	createTable(payload: ITableRequest): Observable<ITableResponse>{
		return this.http.post<ITableResponse>(`${this.tableApiPrefix}/${this.eventUuid}/table`, payload)
	}

	getTableList(): Observable<ITableResponse[]>{
		return this.http.get<ITableResponse[]>(`${this.tableApiPrefix}/${this.eventUuid}/table`).pipe(delay(500))
	}

	getTablesName(): Observable<ITableName[]>{
		return this.http.get<ITableName[]>(`${this.tableApiPrefix}/${this.eventUuid}/table-name`)
	}

	getTableSpace(): Observable<ITableName[]>{
		return this.http.get<ITableName[]>(`${this.tableApiPrefix}/${this.eventUuid}/table/space`)
	}

	assignGuestTable(payload: IAssignTableGuest, tableUuid: string): Observable <ITableResponse>{
		return this.http.post<ITableResponse>(`${this.tableApiPrefix}/${this.eventUuid}/table/${tableUuid}`, payload)
	}

}
