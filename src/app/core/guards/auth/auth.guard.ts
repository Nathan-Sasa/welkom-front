import { inject } from "@angular/core";
import { CanMatchFn, Router } from "@angular/router";
import { AuthService } from "../../auth/services/auth.service";



export const authGuard: CanMatchFn = () => {
    const auth = inject(AuthService)
    const router = inject(Router)

    if (auth.isAuthenticated()) {
        return true
    }
    return router.createUrlTree(['/auth/login'])
}

export const guestGuard: CanMatchFn = () => {
    const auth = inject(AuthService)
    const router = inject(Router)

    if (!auth.isAuthenticated()) {
        return true
    }

    // alert("Cet utilisateur est deja connecté")

    return router.createUrlTree(['/'])
}