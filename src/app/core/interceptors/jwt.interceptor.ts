import { HttpClient, HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http'
import { inject } from '@angular/core'
import { catchError, switchMap } from 'rxjs/operators';
import { EMPTY, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { environment } from '../../../environment/environment';

export const JwtInterceptor: HttpInterceptorFn = (req, next) => {
    const auth = inject(AuthService)
    const router = inject(Router)
    const http = inject(HttpClient)

    const refreshApi = environment.apisUrl.auth.refreshApiUrl

    const ignoredUrl = [
        environment.apisUrl.auth.loginApiUrl,
        environment.apisUrl.auth.registerApiUrl,
        environment.apisUrl.auth.refreshApiUrl,
        environment.apisUrl.auth.currentUserApiUrl
    ]

    const ignoredUrlIf401 = [
        environment.apisUrl.auth.currentUserApiUrl
    ]

    let authReq = req.clone({
        withCredentials: true
    })

    return next(authReq)
        .pipe(
            catchError((error) => {
                if (error instanceof HttpErrorResponse && error.status === 401 && !ignoredUrl.some(url => req.url.includes(url))) {
                    return http.post('http://localhost:8080/api/v1/auth/refresh', {}, {withCredentials: true})
                        .pipe(
                            switchMap((refreshOk) => {
                                console.log('refresh api : ', refreshOk)
                                return next(authReq)
                            }),
                            catchError((refreshError) => {
                                // router.navigate(['/login'])
                                console.log('refresh api : ', refreshApi)
                                console.log('refresh error :', refreshError)
                                return throwError(() => refreshError)
                                // return of(null)
                            })
                        )
                }

                // if (error instanceof HttpErrorResponse && error.status === 500 && !ignoredUrlIf401.some(url => req.url.includes(url))){
                //     router.navigate(['/'])
                // }
                return throwError(() => error)
            })
        )
}