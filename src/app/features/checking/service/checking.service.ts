import { inject, Injectable, signal } from "@angular/core";
import { HttpClient, HttpHeaderResponse, HttpResponse } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { catchError, Observable, of, tap } from "rxjs";
import { toSignal } from "@angular/core/rxjs-interop";

interface IEventKey {
    securityEventKey: string
}

@Injectable({
    providedIn: "root"
})

export class CheckingService {

    private readonly http = inject(HttpClient)

    private readonly checkingAuthApi = environment.apisUrl.checkingUrl.auth
    private readonly checkingAccessApi = environment.apisUrl.checkingUrl.checkAccess
    private readonly checkingScanApi = environment.apisUrl.checkingUrl.scan
    private _signAccessChecking = signal<boolean>(false)
    public readonly signAccessChecking = signal<boolean>(this._signAccessChecking())
    // public readonly signAccessChecking = toSignal(this.getCheckingAccess().pipe(tap(res => {return res}), catchError((err) => {return of(false)})))

    // public readonly isAccessChecking = signal<HttpHeaderResponse | null>(null)

    getCheckingAccess(): Observable<boolean> {
        return this.http.get<any>(this.checkingAccessApi)
            .pipe(
                tap(access => {
                    console.log('access checking ok: ', access)
                    this._signAccessChecking.set(true)
                    return true
                }),
                catchError((err) => {
                    console.log('access checking err: ', err)
                    this._signAccessChecking.set(false)
                    return of(false)
                })
            )
    }

    connectEvent(eventKey: IEventKey): Observable<any>{
        return this.http.post<any>(this.checkingAuthApi, eventKey)
    }

    // getAccess(): boolean {
    //     return this.getCheckingAccess()
    //         .pipe(
    //             tap(res => {
    //             return res
    //             }),
    //             catchError((err) =>{
    //                 return of(false)
    //             })
    //         )
    // }

    // getAccess(): boolean {
    //     console.log('checking access : ', this.signAccessChecking())
    //     return this.signAccessChecking()
    // }
}