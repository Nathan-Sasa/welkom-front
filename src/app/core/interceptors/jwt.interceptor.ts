import { HttpClient, HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http'
import { inject } from '@angular/core'
import { catchError, switchMap } from 'rxjs/operators';
import { EMPTY, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { environment } from '../../../environment/environment';

export const JwtInterceptor: HttpInterceptorFn = (req, next) => {
    const auth = inject(AuthService)
    const router = inject(Router)
    const http = inject(HttpClient)

    const refreshApi = environment.apisUrl.refreshApiUrl

    const ignoredUrl = [
        environment.apisUrl.loginApiUrl,
        environment.apisUrl.registerApiUrl,
        environment.apisUrl.refreshApiUrl,
        environment.apisUrl.currentUserApiUrl
    ]

    const ignoredUrlIf401 = [
        environment.apisUrl.currentUserApiUrl
    ]

    let authReq = req.clone({
        withCredentials: true
    })

    return next(authReq)
        .pipe(
            catchError((error) => {
                if (error instanceof HttpErrorResponse && error.status === 401 && !ignoredUrl.some(url => req.url.includes(url))) {
                    return http.post(refreshApi, {}, {withCredentials: true})
                        .pipe(
                            switchMap((refreshOk) => {
                                return next(authReq)
                            }),
                            catchError((refreshError) => {
                                router.navigate(['/login'])
                                return throwError(() => refreshError)
                            })
                        )
                }

                if (error instanceof HttpErrorResponse && error.status === 500 && !ignoredUrlIf401.some(url => req.url.includes(url))){
                    router.navigate(['/'])
                }
                return throwError(() => error)
            })
        )
}