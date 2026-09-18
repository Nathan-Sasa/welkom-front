import { CanMatchFn, Router } from "@angular/router";
import { Role } from "../../auth/interfaces/role.interface";
import { inject } from "@angular/core";
import { AuthService } from "../../auth/services/auth.service";


export const roleGuard = (...role: Role[]) : CanMatchFn => () => {
    const auth = inject(AuthService)
    const router = inject(Router)
    const user = auth.currentUser()

    if (!user) {
        return router.createUrlTree(['/auth/login'])
    }

    if (role.includes(user.role)) {
        return true
    }

    return router.createUrlTree(['/unauthorized'])
}