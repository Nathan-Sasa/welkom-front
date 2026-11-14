import { inject, Injectable, signal } from "@angular/core";
import { HttpClient, HttpHeaderResponse, HttpResponse } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { catchError, Observable, of, switchMap, tap, throwError } from "rxjs";
import { toSignal } from "@angular/core/rxjs-interop";
import { Router } from "@angular/router";
import { IGuestCheckingResponse } from "../../guest/interfaces/guest.interface";

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
    private readonly router = inject(Router)

    private readonly checkingAuthApi = environment.apisUrl.checkingUrl.auth
    private readonly checkingScanApi = environment.apisUrl.checkingUrl.scan
    private readonly checkingCloseApi = environment.apisUrl.checkingUrl.close
    private readonly checkingGetAuthApi = environment.apisUrl.checkingUrl.checkAccess

    connectEvent(eventKey: IEventKey): Observable<any>{
        return this.http.post<any>(this.checkingAuthApi, eventKey)
    }

    getGuestToken(accessToken: IAccessToken): Observable<IGuestCheckingResponse>{
        return this.http.post<any>(this.checkingScanApi, accessToken)
    }

    closeScanSession(): Observable<any>{
        return this.http.post<any>(this.checkingCloseApi,{})
            .pipe(
                tap((res) => {
                    console.log('close checking session res :', res)
                    void this.router.navigate(['/checking/auth'])
                }),
                catchError((err) => {
                    console.log('close checking session error', err)
                    return of(null)
                })
            )
    }

    getAuthenticationChecking(): Observable<{Authenticated: boolean} | boolean>{
        return this.http.get<{Authenticated: boolean}>(this.checkingGetAuthApi)
            .pipe(
                tap(res => {
                    if (res.Authenticated){
                        return res.Authenticated
                    }
                    return false
                }),
                catchError((err) => {
                    return of(false)
                })
            )
    }
}