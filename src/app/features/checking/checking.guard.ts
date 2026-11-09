import { inject } from "@angular/core";
import { CanMatchFn, Router } from "@angular/router";
import { catchError, map, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment"

export const checkingGuard: CanMatchFn = () => {
    const router = inject(Router)
    const http = inject(HttpClient)

    const eventAccessKeyApiUrl = environment.apisUrl.checkingUrl.checkAccess

    return http.get<{IsValid: boolean}>(eventAccessKeyApiUrl)
        .pipe(
            map(
                response => {
                    if (response) {
                        return true
                    } else {
                        router.navigate(['/checking/auth']);
                        return false;
                    }
                }
            ),
            catchError(() => {
                router.navigate(['/checking/auth']);
                return of(false)
            })
        )
}