import { DestroyRef, inject } from "@angular/core";
import { CanMatchFn, Router } from "@angular/router";
import { CheckingService } from "./service/checking.service";
import { takeUntilDestroyed, toSignal } from "@angular/core/rxjs-interop";
import { catchError, firstValueFrom, map, of, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment"

export const checkingGuard: CanMatchFn = () => {
    // const checking = inject(CheckingService)
    const router = inject(Router)
    const http = inject(HttpClient)

    const eventAccessKeyApiUrl = environment.apisUrl.checkingUrl.checkAccess

    return http.get<{IsValid: boolean}>(eventAccessKeyApiUrl)
        .pipe(
            map(
                response => {
                    if (response) {
                        console.log('checking access guard res : ', response)
                        return true; // Accès autorisé
                    } else {
                        console.log('checking access guard err : ', response)
                        router.navigate(['/checking/auth']);
                        return false;
                    }
                }
            ),
            catchError(() => {
                router.navigate(['/checking/auth']);
                return of(false);
            })
        )

}