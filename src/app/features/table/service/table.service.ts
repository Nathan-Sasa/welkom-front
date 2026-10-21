import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DashboardService } from '../../dashboard/services/dashboard.service';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { ITableName } from '../interface/table.interfaces';

@Injectable({
    providedIn: 'root',
})
export class TableService {
  
	private readonly http = inject(HttpClient)
	private readonly eventUuid = inject(DashboardService).getEventStorage$()?.uuid
	
	private readonly tableApiPrefix = environment.apisUrl.tableUrl.prefix

	getTablesName(): Observable<ITableName[]>{
		return this.http.get<ITableName[]>(`${this.tableApiPrefix}/${this.eventUuid}/table-name`)
	}
}
