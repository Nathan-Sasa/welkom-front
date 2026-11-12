import { inject } from "@angular/core";
import { CanMatchFn, Router } from "@angular/router";
import { catchError, map, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment"

export const checkingGuard: CanMatchFn = () => {
    const router = inject(Router)
    const http = inject(HttpClient)

    const eventAccessKeyApiUrl = environment.apisUrl.checkingUrl.checkAccess

    return http.get<{Authenticated: boolean}>(eventAccessKeyApiUrl)
        .pipe(
            map(
                response => {
                    if (response) {
                        console.log('get checking guard response test', response)
                        return response.Authenticated
                    } else {
                        router.navigate(['/checking/auth']);
                        return false;
                    }
                }
            ),
            catchError((err) => {
                router.navigate(['/checking/auth']);
                console.log('get checking guard response test error : ', err)
                return of(false)
            })
        )
}