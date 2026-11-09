import { inject, Injectable, signal } from "@angular/core";
import { HttpClient, HttpHeaderResponse, HttpResponse } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { catchError, Observable, of, tap } from "rxjs";
import { toSignal } from "@angular/core/rxjs-interop";

interface IAccessToken {
    qrToken: string
}
interface IEventKey {
    securityEventKey: string
}

@Injectable({
    providedIn: "root"
})

export class CheckingService {

    private readonly http = inject(HttpClient)

    private readonly checkingAuthApi = environment.apisUrl.checkingUrl.auth
    private readonly checkingScanApi = environment.apisUrl.checkingUrl.scan

    connectEvent(eventKey: IEventKey): Observable<any>{
        return this.http.post<any>(this.checkingAuthApi, eventKey)
    }

    getGuestToken(accessToken: IAccessToken): Observable<any>{
        return this.http.post<any>(this.checkingScanApi, accessToken)
    }
}