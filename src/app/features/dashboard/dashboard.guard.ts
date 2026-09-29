import { inject } from "@angular/core"
import { CanMatchFn, Router } from "@angular/router"
import { DashboardService } from "./services/dashboard.service"

export const dashboardGuard: CanMatchFn = () => {
    const dashboard = inject(DashboardService)
    const router = inject(Router)

    if (dashboard.getEventStorage$()) {
        return true
    }
    return router.createUrlTree(['/profile'])
}